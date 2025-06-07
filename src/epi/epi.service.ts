import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEpiDto, EpiResponseDto, UpdateEpiDto } from './dto/ep-dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EpiService {
  constructor(private readonly prisma: PrismaService) {}

  // create epi
  async create(epi: CreateEpiDto): Promise<any> {
    try {
      const resp = await this.prisma.epi.create({
        data: {
          title: epi.title,
          category: epi.category,
          description: epi.description,
          minDays: epi.minDays,
          maxDays: epi.maxDays,
          images: epi.images,
          stock: epi.stock,
          availables: epi.stock,
          pricePerDay: epi.pricePerDay,
        },
      });

      return {
        success: true,
        data: plainToClass(EpiResponseDto, epi),
      };
    } catch (error) {
      throw new HttpException(
        'erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   buscar todos
  async getAll(): Promise<any> {
    try {
      const resp = await this.prisma.epi.findMany();

      if (resp.length == 0)
        return {
          success: false,
          message: 'Nenhum equipamento encontrado',
        };

      return {
        success: true,
        data: plainToClass(EpiResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   buscar by id

  async getById(id: string): Promise<any> {
    try {
      const resp = await this.prisma.epi.findUnique({
        where: { id: id },
      });

      if (!resp)
        return {
          success: false,
          message: 'tal equipamento nao existe',
        };

      return {
        success: true,
        data: plainToClass(EpiResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   Buscar por categoria
  async getByCategorie(categorie: string): Promise<any> {
    try {
      const resp = await this.prisma.epi.findMany({
        where: { category: categorie },
      });

      if (resp.length == 0)
        return {
          success: false,
          message: 'Nenhum equipamento encontrado',
        };
    } catch (error) {
      throw new HttpException(
        'erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   apagar equipamento
  async deleteEpi(id: string): Promise<any> {
    try {
      const resp = await this.prisma.epi.deleteMany({
        where: { id: id },
      });

      return {
        success: true,
        message: 'Equipamentos removidos com sucesso',
        data: resp,
      };
    } catch (error) {
      throw new HttpException(
        'erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   atualizar equipamentos

  async update(id: string, epi: UpdateEpiDto): Promise<any> {
    try {
      await this.deleteEpi(id);

      const resp = await this.prisma.epi.create({
        data: {
          title: epi.title,
          category: epi.category,
          description: epi.description,
          minDays: epi.minDays,
          maxDays: epi.maxDays,
          images: epi.images,
          stock: epi.stock,
          pricePerDay: epi.pricePerDay,
          availables: epi.stock,
          status: epi.status,
        },
      });

      return {
        success: true,
        data: plainToClass(EpiResponseDto, resp),
      };
    } catch (error) {
      throw new HttpException(
        'erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   mudar de estado
  async changeStatus(id: string, status: boolean): Promise<any> {
    try {
      const resp = await this.prisma.epi.update({
        where: { id: id },
        data: {
          status: !status,
        },
      });

      return {
        success: true,
        message: !status
          ? 'Equipamento desativado com sucesso'
          : 'Equipamento activado com sucesso',
      };
    } catch (error) {
      throw new HttpException(
        'erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   mudar so disponives
  async toRemove(id: string, qtd: number): Promise<any> {
    try {
      const resp = await this.prisma.epi.findUnique({
        where: {
          id: id,
        },
      });

      if (!resp)
        return {
          success: false,
          message: 'Nenhum equipamento encontrado',
        };

      if (qtd > resp.availables)
        return {
          success: false,
          message: 'Quantidade maior do que o disponivel',
        };

      const respRemove = await this.prisma.epi.update({
        where: { id: id },
        data: {
          availables: resp.availables - qtd,
        },
      });

      return {
        success: true,
        message: `Equimanetos diponives retirados: ${qtd} e os disponiveis: ${resp.availables - qtd}`,
      };
    } catch (error) {
      throw new HttpException(
        'erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   o mesmo
  async toReturn(id: string, qtd: number): Promise<any> {
    try {
      const resp = await this.prisma.epi.findUnique({
        where: { id: id },
      });

      if (resp.availables + qtd > resp.stock)
        return {
          success: false,
          message: 'Nao e possivel realizar o processo',
        };

      const respReturn = await this.prisma.epi.update({
        where: { id: id },
        data: {
          availables: resp.availables + qtd,
        },
      });

      return {
        success: true,
        message: `Eauipamentos devolvido com sucesso ${qtd} disponiveis ${respReturn.availables}`,
      };
    } catch (error) {
      throw new HttpException(
        'erro ao processar requisicao -> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
