import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
@Injectable()
export class AntibioticGetterService {
  constructor(private readonly _prisma: PrismaService) {}

  async get(id: number) {
    const raw = await this._prisma.antibiotic.findUniqueOrThrow({
      where: { id },
    });
    return raw;
  }
}
