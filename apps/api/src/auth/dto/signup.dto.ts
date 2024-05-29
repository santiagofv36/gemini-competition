import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email, please enter a correct one!' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  readonly password: string;
}
