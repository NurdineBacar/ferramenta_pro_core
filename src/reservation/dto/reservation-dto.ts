import { IsString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  reservedDays: number;

  @IsInt()
  remainDays: number;

  @IsNumber()
  numEpis: number;

  @IsNumber()
  total: number;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  epiid?: string;

  @IsString()
  userId: string;
}

export class UpdateReservationDto {
  @IsOptional()
  @IsInt()
  reservedDays?: number;

  @IsOptional()
  @IsInt()
  remainDays?: number;

  @IsNumber()
  numEpis: number;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  epiid?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

export class ReservationResponseDto {
  @IsString()
  id: string;

  @IsInt()
  reservedDays: number;

  @IsInt()
  remainDays: number;

  @IsNumber()
  total: number;

  @IsNumber()
  numEpis: number;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  epiid?: string;

  @IsOptional()
  epi?: any; // ou defina um tipo EpiResponseDto

  @IsString()
  userId: string;

  @IsOptional()
  user?: any; // ou defina um tipo UserResponseDto
}
