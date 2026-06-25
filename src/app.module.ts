import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventModule } from './modules/event/event.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AppController } from './app.controller';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    MongooseModule.forRoot(process.env.MONGO_URI!),

    AuthModule,
    EventModule,
    UsersModule,
    ReservationModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}