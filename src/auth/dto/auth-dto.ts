import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
