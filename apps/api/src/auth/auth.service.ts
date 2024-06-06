import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SignUpUserDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { google } from 'googleapis';
import { TokenBlacklist } from './schemas/token.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(TokenBlacklist.name)
    private readonly tokenBlacklistModel: Model<TokenBlacklist>,
  ) {}

  async signUp(signupDto: SignUpUserDto): Promise<{ token: string }> {
    const { name, email, password, google_token } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      google_token, // TODO: Hash this token
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('Invalid Credentials!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid Credentials!');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async invalidateToken(token: string) {
    const decoded = this.jwtService.decode(token) as {
      exp: number;
      id: string;
    };

    const expiration = new Date(decoded.exp * 1000);

    const isAlreadyBlacklisted = await this.tokenBlacklistModel.findOne({
      token,
    });

    if (isAlreadyBlacklisted) {
      return;
    }

    await this.tokenBlacklistModel.create({
      // TODO: Create a cron job to remove expired tokens from db
      token,
      expiresAt: expiration,
    });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const isBlacklisted = await this.tokenBlacklistModel.findOne({ token });

    return !!isBlacklisted;
  }

  async connectToGmail(user: User & { token: string }): Promise<any> {
    const { google_token } = user;

    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'http://localhost:3001/api/auth/google/callback',
      );

      const scope = ['https://mail.google.com/'];

      oauth2Client.generateAuthUrl({
        scope,
      });

      oauth2Client.setCredentials({ access_token: google_token });

      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

      const res = await gmail.users.messages.list({
        userId: 'me',
      });

      const { messages } = res.data;

      // const threads: any = [];

      const messageOne = await gmail.users.messages.get({
        userId: 'me',
        id: messages?.[0].id ?? '',
      });

      return {
        messageOne,
        nextPageToken: res?.data?.nextPageToken,
        resultEstimateSize: res?.data?.resultSizeEstimate,
      };
    } catch (e) {
      console.log(e);
      // this.invalidateToken(user.token);
      return new BadRequestException(
        'Failed to connect to Gmail, Please log in again.',
      );
    }
  }
}
