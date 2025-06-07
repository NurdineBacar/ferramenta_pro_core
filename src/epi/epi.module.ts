import { Module } from '@nestjs/common';
import { EpiController } from './epi.controller';
import { EpiService } from './epi.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EpiController],
  providers: [EpiService],
})
export class EpiModule {}
