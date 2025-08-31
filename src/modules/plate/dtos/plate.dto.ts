import { ApiProperty } from '@nestjs/swagger';
import { Plate } from '@prisma/client';

export class PlateDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  patientId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  mediaId: number;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(raw: RawPlate) {
    this.id = raw.id;
    this.patientId = raw.patientId;
    this.userId = raw.userId;
    this.mediaId = raw.mediaId;
    this.notes = raw.notes;
    this.createdAt = raw.createdAt;
    this.updatedAt = raw.updatedAt;
  }
}

export type RawPlate = Omit<Plate, ''> & {};
