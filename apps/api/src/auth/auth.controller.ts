import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup.dto';
import { Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.dto';

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
}
