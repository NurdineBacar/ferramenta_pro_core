import { IsString } from 'class-validator';

export class AddFavoriteDto {
  @IsString()
  userId: string;

  @IsString()
  epiId: string;
}

export class RemoveFavoriteDto {
  @IsString()
  userId: string;

  @IsString()
  epiId: string;
}
