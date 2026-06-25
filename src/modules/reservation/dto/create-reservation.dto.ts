import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  event: string;

  @IsEnum(['pending', 'confirmed', 'cancelled'])
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsString()
  qrcode?: string;
}
