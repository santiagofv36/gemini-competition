import { Controller, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@server/auth/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findByEmail(@Body('email') email: string): Promise<User | null> {
    return await this.userService.findOneByEmail(email);
  }
}
