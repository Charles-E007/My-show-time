import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, Req, UnauthorizedException,Render, NotFoundException} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Get('user/:userId')
  @HttpCode(200)
  async findByUser(@Param('userId') userId: string) {
    return this.reservationService.findByUser(userId);
  }


  @Get(':id/view')
  @Render('ticket')
  async viewTicket(@Param('id') id: string) {
    const reservation = await this.reservationService.findOne(id);
    if (!reservation) {
      throw new NotFoundException('Ticket introuvable bro');
    }

    return { reservation };
  }
  //on a pas encore fait oh fait, mais j'ai quand mm protéger la reservation si l'utilisateur n'est pas connecter
  //avec le temps on sera developpeur Senior
  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateReservationDto, @Req() req: any) {
    if (!req.user) {
      throw new UnauthorizedException('Connecte toi avant de reserver bro');
    }
    const secureDto = {
      ...dto,
      user: req.user._id
    };

    return this.reservationService.create(secureDto);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
    return this.reservationService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    return this.reservationService.delete(id);
  }
}
