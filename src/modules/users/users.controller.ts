import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpCode,
  Param,
  Body,
  Render,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return this.usersService.findAll();
  }

  //   @Get(':id')
  //   @HttpCode(200)
  //   async findOne(@Param('id') id: string) {
  //     return this.usersService.findOne(id);
  //   }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  @HttpCode(200)
  @Render('profile')
  async showProfile(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return { user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('edit/:id')
  @HttpCode(200)
  @Render('updateprofile')
  async editProfile(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return { user };
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.usersService.create(body.name, body.email, body.password);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() user: any) {
    return this.usersService.update(id, user);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
