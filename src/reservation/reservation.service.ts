import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import {
  CreateReservationDto,
  ReservationResponseDto,
  UpdateReservationDto,
} from './dto/reservation-dto';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar reserva
  async create(data: CreateReservationDto): Promise<any> {
    try {
      const resp = await this.prisma.reservation.create({
        data: {
          reservedDays: data.reservedDays,
          remainDays: data.remainDays,
          numEpis: data.numEpis,
          total: data.total,
          status: data.status,
          epiid: data.epiid,
          userId: data.userId,
        },
      });
      return {
        success: true,
        data: plainToClass(ReservationResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisição -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Buscar todas reservas
  async getAll(): Promise<any> {
    try {
      const resp = await this.prisma.reservation.findMany({
        include: { epi: true, user: true },
      });
      return {
        success: true,
        data: plainToClass(ReservationResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisição -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Buscar reserva por id
  async getById(id: string): Promise<any> {
    try {
      const resp = await this.prisma.reservation.findUnique({
        where: { id },
        include: { epi: true, user: true },
      });
      if (!resp) {
        return {
          success: false,
          message: 'Reserva não encontrada',
        };
      }
      return {
        success: true,
        data: plainToClass(ReservationResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisição -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Atualizar reserva
  async update(id: string, data: UpdateReservationDto): Promise<any> {
    try {
      const resp = await this.prisma.reservation.update({
        where: { id },
        data: { ...data },
      });
      return {
        success: true,
        data: plainToClass(ReservationResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisição -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Atualizar status da reserva
  async updateStatus(id: string, status: string): Promise<any> {
    try {
      const resp = await this.prisma.reservation.update({
        where: { id },
        data: { status },
      });
      return {
        success: true,
        data: plainToClass(ReservationResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisição -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Deletar todas reservas
  async deleteAll(): Promise<any> {
    try {
      const resp = await this.prisma.reservation.deleteMany();
      return {
        success: true,
        data: resp,
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisição -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Deletar reserva por id
  async deleteById(id: string): Promise<any> {
    try {
      const resp = await this.prisma.reservation.delete({
        where: { id },
      });
      return {
        success: true,
        data: resp,
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao processar requisição -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
