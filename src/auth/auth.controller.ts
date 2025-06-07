import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServie: AuthService) {}

  @Post('sign-in')
  signIn(@Body() data: AuthDto) {
    return this.authServie.signIn(data);
  }
}
