import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { RawResult, ResultDto } from '../dtos/result.dto';
@Injectable()
export class PlateCreatorService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(data: ICreatePlate) {
    const patient = await this._prisma.plate.create({ data });
    return patient;
  }

  async process(id: number): Promise<RawResult> {
    // const plate = await this._prisma.plate.findUniqueOrThrow({ where: { id } });
    const raw = await this._prisma.result.create({
      data: { status: 'Done', plateId: id },
      // select: {
      //   antibioticDetections: {},
      //   status: true,
      //   plateId: true,
      // },
    });
    return new ResultDto(raw);
  }
}
export interface ICreatePlate {
  userId: number;
  patientId: number;
  mediaId: number;
  notes: string;
}
