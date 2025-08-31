import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { RawPlate } from '../dtos/plate.dto';

@Injectable()
export class PlateGetterService {
  constructor(private readonly _prisma: PrismaService) {}

  async findById(id: number): Promise<RawPlate> {
    return await this._prisma.plate.findUniqueOrThrow({
      where: { id },
    });
  }
}
