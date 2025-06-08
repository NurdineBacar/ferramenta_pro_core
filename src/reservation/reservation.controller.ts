import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/reservation-dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  @Get()
  async getAll() {
    return this.reservationService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.reservationService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
    return this.reservationService.update(id, dto);
  }

  @Patch('status/:id')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.reservationService.updateStatus(id, status);
  }

  @Delete('delete-all')
  async deleteAll() {
    return this.reservationService.deleteAll();
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.reservationService.deleteById(id);
  }
}
