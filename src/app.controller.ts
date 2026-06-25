import {
  Controller,
  Get,
  //   Post,
  //   Put,
  //   Delete,
  //   Param,
  //   Body,
  //   UseInterceptors,
  //   UploadedFile,
  Render,
} from '@nestjs/common';
import { EventService } from './modules/event/event.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

@Controller()
export class AppController {
  constructor(private readonly eventService: EventService) {}

  @Get('')
  @Render('home')
  async showHome() {
    const events = await this.eventService.findAll();
    return { events };
  }

  @Get('login')
  @Render('login')
  login() {
    return;
  }

    // @Get('dashboard')
    // @Render('dashboard')
    // async dashboard() {
    //     const events = await this.eventService.findAll();
    //     return { events };
    // }
  @Get('register')
  @Render('register')
  register() {
    return;
  }

  @Get('formAdduser')
  @Render('formAdduser')
  async showAddUsers() {
    const events = await this.eventService.findAll();
    return { events };
  }
}
