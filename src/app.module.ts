import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EpiModule } from './epi/epi.module';
import { ReservationModule } from './reservation/reservation.module';
import { FavModule } from './fav/fav.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, EpiModule, ReservationModule, FavModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
