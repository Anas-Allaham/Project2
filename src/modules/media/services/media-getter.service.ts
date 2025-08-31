import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class MediaGetterService {
  constructor(private readonly _prisma: PrismaService) {}
  async get(mediaId: number) {
    return await this._prisma.media.findUniqueOrThrow({
      where: {
        id: mediaId,
      },
    });
  }
}
