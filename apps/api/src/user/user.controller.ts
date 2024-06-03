import { Controller, Get, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@server/auth/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findByEmail(
    @Body('email') email: string,
  ): Promise<User | BadRequestException> {
    return await this.userService.findOneByEmail(email);
  }
}
