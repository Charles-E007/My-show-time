import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Render,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { EventService } from './event.service';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/events',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateEventDto,
  ) {
    if (file) {
      dto['imageUrl'] = 'events/' + file.filename;
    }
    return this.eventService.create(dto);
  }

  // @Get('')
  // @Render('home')
  // async showHome() {
  //   const events = await this.eventService.findAll();
  //   return { events };
  // }

  // @Get('formAdduser')
  // @Render('formAdduser')
  // async showAddUsers() {
  //   const events = await this.eventService.findAll();
  //   return { events };
  // }

  // @Get('register1')
  // @Render('register')
  // showRegister() {
  //   // const event = await this.eventService.findAll();
  //   return;
  // }

  // @Get('detail')
  // @Render('detail')
  // async showDetail() {
  //   const event = await this.eventService.findAll();
  //   return { event };
  // }

  // @Get('profile')
  // @Render('profile')
  // async showProfile() {
  //   const event = await this.eventService.findAll();
  //   return { event };
  // }

  // @Get('login1')
  // @Render('login')
  // async showLogin() {
  //   const event = await this.eventService.findAll();
  //   return { event };
  // }

  // @Get(':id')
  // @Render('detail')
  // async showDetail() {
  //   const event = await this.eventService.findAll();
  //   return { event };
  // }

  // @Get('profile')
  // @Render('profile')
  // async showProfile() {
  //   const event = await this.eventService.findAll();
  //   return { event };
  // }

  // @Get('login')
  // @Render('login')
  // async showLogin() {
  //   const event = await this.eventService.findAll();
  //   return { event };
  // }

  @Get(':id')
  @Render('detail')
  async showEvent(@Param('id') id: string) {
    const event = await this.eventService.findOne(id);
    return { event };
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
