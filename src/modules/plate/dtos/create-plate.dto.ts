import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePlateDto {
  @ApiProperty()
  @IsNumber()
  patientId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  mediaId: number;

  @ApiProperty()
  @IsString()
  notes: string;
}
