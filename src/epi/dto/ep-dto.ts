import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  IsDate,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateEpiDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  minDays: number;

  @IsOptional()
  @IsInt()
  maxDays?: number;

  @IsNumber()
  stock: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNumber()
  pricePerDay: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}

export class EpiResponseDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  minDays: number;

  @IsOptional()
  @IsInt()
  maxDays?: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNumber()
  stock: number;

  @IsNumber()
  availables: string;

  @IsBoolean()
  status: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class UpdateEpiDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  minDays: number;

  @IsOptional()
  @IsInt()
  maxDays?: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  pricePerDay: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}
