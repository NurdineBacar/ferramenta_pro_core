import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EpiService } from './epi.service';
import { CreateEpiDto, UpdateEpiDto } from './dto/ep-dto';

@Controller('epi')
export class EpiController {
  constructor(private readonly epiService: EpiService) {}

  @Post('/store')
  async create(@Body() dto: CreateEpiDto) {
    return this.epiService.create(dto);
  }

  @Get()
  async getAll() {
    return this.epiService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.epiService.getById(id);
  }

  @Get('categorie/:categorie')
  async getByCategorie(@Param('categorie') categoria: string) {
    return this.epiService.getByCategorie(categoria);
  }

  @Delete('delete-all')
  async deleteAll() {
    return this.epiService.deleteAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.epiService.deleteEpi(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEpiDto) {
    return this.epiService.update(id, dto);
  }

  @Put('status/:id')
  async changeStatus(@Param('id') id: string, @Body('status') status: boolean) {
    return this.epiService.changeStatus(id, status);
  }

  @Put('remove/:id')
  async toRemove(@Param('id') id: string, @Body('qtd') qtd: number) {
    return this.epiService.toRemove(id, qtd);
  }

  @Put('return/:id')
  async toReturn(@Param('id') id: string, @Body('qtd') qtd: number) {
    return this.epiService.toReturn(id, qtd);
  }
}
