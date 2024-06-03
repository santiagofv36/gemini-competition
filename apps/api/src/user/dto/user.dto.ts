import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AssignGoogleTokenDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly google_token: string;
}
