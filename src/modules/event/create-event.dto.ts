import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  lieu: string;

  @IsString({ each: true })
  artist: string[];

  @IsString()
  descript: string;

  @IsDateString()
  date_event: Date;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  imageUrl: string;
}
