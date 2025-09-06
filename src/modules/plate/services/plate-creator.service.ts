import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { RawResult, ResultDto } from '../dtos/result.dto';
import { PrismaTx } from 'src/modules/prisma/services/prisma-tx.type';
@Injectable()
export class PlateCreatorService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(prisma: PrismaTx, data: ICreatePlate): Promise<RawResult> {
    const plate = await prisma.plate.create({
      data: {
        notes: data.notes,
        patient: { connect: { id: data.patientId } },
        image: { connect: { id: data.mediaId } },
        user: { connect: { id: data.userId } }, // required relation
      },
      // data,
    });

    const raw = await prisma.result.create({
      data: { status: 'Undetected', plateId: plate.id },
      // select: {
      //   antibioticDetections: {},
      //   status: true,
      //   plateId: true,
      // },
    });
    return raw;
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
