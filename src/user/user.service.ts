import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UserResponseDto } from './dto/user-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<any> {
    try {
      const resp = await this.prisma.user.create({
        data: {
          name: data.name.toLowerCase(),
          email: data.email,
          phone_number: `(+258) ${data.phone_number.substring(0, 2)} ${data.phone_number.substring(3, 6)} ${data.phone_number.substring(6, 10)}`,
          password: data.password,
          role: data.role,
        },
      });

      return {
        success: true,
        data: plainToInstance(UserResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAll(): Promise<any> {
    try {
      const resp = await this.prisma.user.findMany({});

      if (resp.length == 0) {
        return {
          success: false,
          message: 'Nenhum utilizador encontrado',
        };
      }

      return {
        success: true,
        data: plainToInstance(UserResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteAll(): Promise<any> {
    try {
      const resp = await this.prisma.user.deleteMany();

      return {
        success: true,
        resp,
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
