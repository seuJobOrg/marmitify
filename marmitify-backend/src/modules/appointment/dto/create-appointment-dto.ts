import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  chefId: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateTime: Date;

  @IsString()
  @IsOptional()
  notes?: string;
}
