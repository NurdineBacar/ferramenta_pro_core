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
}
