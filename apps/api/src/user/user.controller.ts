import {
  Controller,
  Get,
  Body,
  BadRequestException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@server/auth/schemas/user.schema';
import { AssignGoogleTokenDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findByEmail(
    @Body('email') email: string,
  ): Promise<User | BadRequestException> {
    return await this.userService.findOneByEmail(email);
  }

  @Post('/assign-google-token')
  async assignGoogleToken(
    @Body() assignGoogleTokenDto: AssignGoogleTokenDto,
  ): Promise<User | BadRequestException> {
    return await this.userService.assignGoogleToken(assignGoogleTokenDto);
  }
}
