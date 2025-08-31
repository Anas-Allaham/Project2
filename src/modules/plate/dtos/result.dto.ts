import { ApiProperty } from '@nestjs/swagger';
import { Result } from '@prisma/client';
import {
  AntiBioticDetectionDto,
  RawAntiBioticDetection,
} from 'src/modules/antibiotic/dtos/antibiotic.dto';

export class ResultDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  plateId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  antibioticDetections: AntiBioticDetectionDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(raw: RawResult) {
    const antibioticDetections = raw.antibioticDetections?.map(
      (antibiotic) => new AntiBioticDetectionDto(antibiotic),
    );
    this.id = raw.id;
    this.plateId = raw.plateId;
    this.status = raw.status;
    this.createdAt = raw.createdAt;
    this.updatedAt = raw.updatedAt;
    this.antibioticDetections = antibioticDetections;
  }
}

export type RawResult = Omit<Result, 'deletedAt'> & {
  antibioticDetections?: RawAntiBioticDetection[];
};
