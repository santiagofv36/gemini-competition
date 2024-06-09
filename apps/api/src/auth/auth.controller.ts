/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Request,
  Get,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup.dto';
import { Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: SignUpUserDto })
  async signUp(@Body() signupDto: SignUpUserDto): Promise<{ token: string }> {
    return this.authService.signUp(signupDto);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Body() loginDto: LoginUserDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('current-user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async currentUser(@Request() req: any): Promise<any> {
    const { google_token, ...rest } = req.user;
    return rest;
  }

  @Get('/gmail/inbox')
  @UseGuards(AuthGuard('jwt'))
  async getGmailInbox(@Request() req: any): Promise<any> {
    return this.authService.connectToGmail(req.user);
  }

  @Delete('/logout')
  @UseGuards(AuthGuard('jwt'))
  async invalidateToken(@Request() req: any): Promise<any> {
    return this.authService.invalidateToken(req.user.token);
  }
}
