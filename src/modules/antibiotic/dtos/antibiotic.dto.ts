import { ApiProperty } from '@nestjs/swagger';

export class AntiBioticDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(raw: RawAntiBiotic) {
    this.id = raw.id;
    this.name = raw.name;
    this.createdAt = raw.createdAt;
    this.updatedAt = raw.updatedAt;
  }
}

export class AntiBioticDetectionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  plateId: number;

  @ApiProperty()
  antibiotic: AntiBioticDto;

  @ApiProperty()
  value: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(raw: RawAntiBioticDetection) {
    this.id = raw.id;
    this.antibiotic = new AntiBioticDto(raw.antibiotic);
    this.plateId = raw.plateId;
    this.createdAt = raw.createdAt;
    this.updatedAt = raw.updatedAt;
  }
}

export type RawAntiBioticDetection = Omit<AntiBioticDetectionDto, ''> & {};
export type RawAntiBiotic = Omit<AntiBioticDto, ''> & {};
