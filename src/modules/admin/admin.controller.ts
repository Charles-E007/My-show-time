import {
  Controller,
  Get,
  Render,
  Param,
  Delete,
  Redirect,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../event/event.service';
import { UsersService } from '../users/users.service';
import { AdminGuard } from '../auth/guards/admin.guard';

import { CreateEventDto } from '../event/create-event.dto';
import { UpdateEventDto } from '../event/update-event.dto';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {

  constructor(
    private readonly eventService: EventService,
    private readonly usersService: UsersService,
  ) {}

  @Get('dashboard-users')
  @Render('dashboard_users')
  async dashboardUsers() {
    const users = await this.usersService.findAll();
    return { users };
  }

  @Delete('dashboard-users/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }

  @Get('formAdduser')
  @Render('formAdduser')
  formAdduser() {
    return;
  }

  @Post('formAdduser')
  @Redirect('/admin/dashboard-users')
  async createUser(
    @Body() body: { name: string; email: string; password: string },
  ) {
    await this.usersService.create(body.name, body.email, body.password);
  }

  @Get('edit-user/:id')
  @Render('formEditUser')
  async editUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return { user };
  }

  @Put('edit-user/:id')
  @Redirect('/admin/dashboard-users')
  async updateUser(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
  ) {
    await this.usersService.update(id, body);
  }

  @Get('dashboard-events')
  @Render('dashboard_events')
  async dashboard() {
    const events = await this.eventService.findAll();
    return { events };
  }

  @Get('formAddEvent')
  @Render('formAddEvent')
  formAddEvent() {
    return;
  }

  @Post('formAddEvent')
  @Redirect('/admin/dashboard-events')
  async createEvent(@Body() body: CreateEventDto) {
    if (body.date_event) {
      body.date_event = new Date(body.date_event);
    }
    await this.eventService.create(body);
  }

  @Get('formEditEvent/:id')
  @Render('formEditEvent')
  async editEvent(@Param('id') id: string) {
    const event = await this.eventService.findOne(id);
    return { event };
  }

  @Put('formEditEvent/:id')
  @Redirect('/admin/dashboard-events')
  async updateEvent(@Param('id') id: string, @Body() body: UpdateEventDto) {
    await this.eventService.update(id, body);
  }

  @Delete('dashboard-events/:id')
  async deleteEvent(@Param('id') id: string) {
    await this.eventService.remove(id);
    return { message: 'Event deleted successfully' };
  }
   @Put('dashboard-users/:id/role')
   async updateRole(@Param('id') id: string, @Body() body: { role: string }) {
    await this.usersService.update(id, { role: body.role });
    return { message: 'Role updated successfully' };

}
}
