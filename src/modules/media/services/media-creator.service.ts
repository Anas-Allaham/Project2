import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class MediaCreatorService {
  constructor(private readonly _prisma: PrismaService) {}
  async upload(data: ICreateMedia) {
    return this._prisma.media.create({
      data,
    });
  }
}

interface ICreateMedia {
  path: string;
  name: string;
}
