import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  lieu: string;

  @Prop({ type: [String], default: [] })
  artist: string[];

  @Prop()
  descript: string;

  @Prop({ required: true })
  date_event: Date;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  imageUrl: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
