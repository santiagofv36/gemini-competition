import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@server/auth/schemas/user.schema';
import { Model } from 'mongoose';
import { AssignGoogleTokenDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | BadRequestException> {
    const user = await this.userModel.findOne({ email }).select('-password');

    if (!user) {
      return new BadRequestException(
        'Invalid credentials, please check with support',
      );
    }

    return user;
  }

  async assignGoogleToken(
    assignGoogleTokenDto: AssignGoogleTokenDto,
  ): Promise<User | BadRequestException> {
    const user = await this.userModel.findOne({
      email: assignGoogleTokenDto.email,
    });

    if (!user) {
      return new BadRequestException(
        'Invalid credentials, please check with support',
      );
    }

    user.google_token = assignGoogleTokenDto.google_token;

    await user.save();

    return user;
  }
}
