import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signIn(data: AuthDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não existe');
    }

    if (user.password !== data.password) {
      // ⚠️ Isso deve ser substituído por bcrypt.compare()
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { sub: user.id, email: user.email }; // Não inclua dados sensíveis no payload

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
