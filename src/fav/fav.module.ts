import { Module } from '@nestjs/common';
import { FavController } from './fav.controller';
import { FavService } from './fav.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FavController],
  providers: [FavService],
})
export class FavModule {}
