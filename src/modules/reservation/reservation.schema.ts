import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed',
  })
  @Prop({ type: String, default: 'confirmed' })e
  status: string;

  @Prop()
  qrcode: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

ReservationSchema.index({ user: 1, event: 1 }, { unique: true });
