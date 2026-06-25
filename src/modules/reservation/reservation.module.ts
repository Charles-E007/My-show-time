// import { Module } from '@nestjs/common';
// import { ReservationService } from './reservation.service';
// import { ReservationController } from './reservation.controller';

// @Module({
//   controllers: [ReservationController],
//   providers: [ReservationService],
// })
// export class ReservationModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation, ReservationSchema } from './reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
