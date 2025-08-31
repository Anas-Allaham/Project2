import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
@Injectable()
export class AntibioticGetterService {
  constructor(private readonly _prisma: PrismaService) {}

  //   async get() {
  //     const raw = await this._prisma.antibiotic.create({ data });
  //     return raw;
  //   }
}

export interface ICreateAntibiotic {
  name: string;
}
