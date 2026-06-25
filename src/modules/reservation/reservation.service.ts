import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import * as QRCode from 'qrcode';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel
      .find()
      .populate('user')
      .populate('event')
      .exec();
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationModel
      .findById(id)
      .populate('user')
      .populate('event')
      .exec();
  }

  async findByUser(userId: string): Promise<Reservation[]> {
    return this.reservationModel
      .find({ user: userId })
      .populate('event')
      .exec();
  }

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const reservation = new this.reservationModel(dto);
    await reservation.save();

    const qrcode = await QRCode.toDataURL(
      `http://localhost:3000/reservations/${reservation._id}`,
    );
    reservation.qrcode = qrcode;
    return reservation.save();
  }

  async update(
    id: string,
    dto: UpdateReservationDto,
  ): Promise<Reservation | null> {
    return this.reservationModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<string> {
    await this.reservationModel.findByIdAndDelete(id).exec();
    return 'Reservation deleted successfully';
  }
}
