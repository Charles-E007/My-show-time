import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './event.schema';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>, private usersService: UsersService
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const event = new this.eventModel(dto);

    const users = this.usersService.findAll();

    for (const user of await users){
      for (const artist of event.artist) {
          if (user.favoris.includes(artist)) {
            user.message.push(`L'artiste ${artist} a un concert prévu pour le ${event.date_event} au ${event.lieu}`)
            await this.usersService.update(user._id.toString(), user);
          }
      }
    }

    return event.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) throw new NotFoundException('Event #' + id + ' pas trouvé bro');
    return event;
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    const event = await this.eventModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!event) throw new NotFoundException('Event #' + id + ' pas trouvé bro');
    return event;
  }

  async remove(id: string): Promise<Event> {
    const event = await this.eventModel.findByIdAndDelete(id).exec();
    if (!event) throw new NotFoundException('Event #' + id + ' pas trouvé bro');
    return event;
  }
}
