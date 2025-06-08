import { Exclude } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsArray,
  IsDate,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  @IsArray()
  token: string[];

  @IsString()
  role: string;

  @Exclude()
  password: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  @MinLength(6)
  @MaxLength(8)
  password: string;

  @IsString()
  role: string;
}

export class UpdateProfileDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone_number: string;
}
