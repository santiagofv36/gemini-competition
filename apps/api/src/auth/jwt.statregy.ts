/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './schemas/user.schema';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { id: string }) {
    const { id } = payload;

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const isBlacklisted = await this.authService.isTokenBlacklisted(token!);

    if (isBlacklisted) {
      throw new UnauthorizedException('Token is blacklisted.');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    const { password, ...rest } = user.toObject();

    return {
      ...rest,
      token,
    };
  }
}
