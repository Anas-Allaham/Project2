import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { RawPlate } from '../dtos/plate.dto';
import { RawResult } from '../dtos/result.dto';
import { PaginationDto } from 'src/common/filter/pagination/pagination-param.dto';
import { PlateFilterDto } from '../dtos/filters-plates.dto';
import { Prisma } from '@prisma/client';
import { FindAllPlateDto } from '../dtos/find-all-plates.dto';
import { selectResultValidator } from '../validators/select-result.validator';
import { selectFullPlateValidator } from '../validators/full-plate.validator';

@Injectable()
export class PlateGetterService {
  constructor(private readonly _prisma: PrismaService) {}

  async findById(id: number): Promise<RawPlate> {
    return await this._prisma.plate.findUniqueOrThrow({
      where: { id },
      select: selectFullPlateValidator(),
    });
  }

  async findResultById(id: number): Promise<RawResult> {
    return await this._prisma.result.findUniqueOrThrow({
      where: { id },
      select: selectResultValidator(),
    });
  }

  async findAll(pagination: PaginationDto, filter: PlateFilterDto) {
    const search = filter?.search?.trim();
    const start = filter?.startDate ? new Date(filter.startDate) : undefined;
    const end = filter?.endDate ? new Date(filter.endDate) : undefined;

    const where: Prisma.PlateWhereInput = {
      ...(search
        ? {
            OR: [
              { notes: { contains: search } },
              {
                patient: {
                  OR: [
                    { firstName: { contains: filter.fistName } },
                    { lastName: { contains: filter.lastName } },
                    { number: { contains: search } },
                  ],
                },
              },
              {
                user: {
                  OR: [
                    { name: { contains: search } },
                    { email: { contains: search } },
                  ],
                },
              },
              {
                image: {
                  OR: [
                    { name: { contains: search } },
                    { path: { contains: search } },
                  ],
                },
              },
            ],
          }
        : {}),
      ...(filter?.userId ? { userId: filter.userId } : {}),
      ...(filter?.status
        ? { result: { is: { status: filter.status } } } // one-to-one relation filter
        : {}),
      ...((start || end) && {
        createdAt: {
          ...(start ? { gte: start } : {}),
          ...(end ? { lte: end } : {}),
        },
      }),
    };

    const [raws, count] = await Promise.all([
      this._prisma.plate.findMany({
        where,
        select: selectFullPlateValidator(),
        skip: pagination?.skip ?? 0,
        take: pagination?.limit ?? 10,
        orderBy: { createdAt: 'desc' },
      }),
      this._prisma.plate.count({ where }),
    ]);

    return new FindAllPlateDto(count, raws);
  }
}
