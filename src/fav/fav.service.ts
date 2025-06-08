import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddFavoriteDto, RemoveFavoriteDto } from './dto/fav-dto';

@Injectable()
export class FavService {
  constructor(private readonly prisma: PrismaService) {}

  // Adicionar aos favoritos
  async addFavorite(dto: AddFavoriteDto) {
    try {
      await this.prisma.user.update({
        where: { id: dto.userId },
        data: {
          favorites: {
            connect: { id: dto.epiId },
          },
        },
      });
      return { success: true, message: 'Favorito adicionado com sucesso' };
    } catch (error) {
      throw new HttpException(
        'Erro ao adicionar favorito: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Remover dos favoritos
  async removeFavorite(dto: RemoveFavoriteDto) {
    try {
      await this.prisma.user.update({
        where: { id: dto.userId },
        data: {
          favorites: {
            disconnect: { id: dto.epiId },
          },
        },
      });
      return { success: true, message: 'Favorito removido com sucesso' };
    } catch (error) {
      throw new HttpException(
        'Erro ao remover favorito: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Listar favoritos do usuário
  async listFavorites(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { favorites: true },
      });
      return { success: true, data: user?.favorites || [] };
    } catch (error) {
      throw new HttpException(
        'Erro ao listar favoritos: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Buscar EPIs e marcar favoritos
  async getEpisWithFavorites(userId: string) {
    try {
      const [epis, user] = await Promise.all([
        this.prisma.epi.findMany(),
        this.prisma.user.findUnique({
          where: { id: userId },
          include: { favorites: true },
        }),
      ]);
      const favIds = new Set(user?.favorites.map((f) => f.id));
      const result = epis.map((epi) => ({
        ...epi,
        isFavorite: favIds.has(epi.id),
      }));
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar EPIs: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
