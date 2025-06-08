import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { FavService } from './fav.service';
import { AddFavoriteDto, RemoveFavoriteDto } from './dto/fav-dto';

@Controller('fav')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Post('add')
  async addFavorite(@Body() dto: AddFavoriteDto) {
    return this.favService.addFavorite(dto);
  }

  @Delete('remove/:userId/:epiId')
  async removeFavorite(
    @Param('userId') userId: string,
    @Param('epiId') epiId: string,
  ) {
    const dto = {
      userId: userId,
      epiId: epiId,
    };
    return this.favService.removeFavorite(dto);
  }

  @Get('list/:userId')
  async listFavorites(@Param('userId') userId: string) {
    return this.favService.listFavorites(userId);
  }

  @Get('epis-with-fav/:userId')
  async getEpisWithFavorites(@Param('userId') userId: string) {
    return this.favService.getEpisWithFavorites(userId);
  }
}
