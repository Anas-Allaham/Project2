import { Injectable } from '@nestjs/common';
import { CreatePlateDto } from '../dtos/create-plate.dto';
import { PlateDto } from '../dtos/plate.dto';
import { PlateCreatorService } from '../services/plate-creator.service';
import { PlateGetterService } from '../services/plate-getter.service';
import { ResultDto } from '../dtos/result.dto';

@Injectable()
export class PlateApiService {
  constructor(
    private readonly _plateCreator: PlateCreatorService,
    private readonly _plateGetter: PlateGetterService,
    // private readonly _plateUpdater: PlateUpdaterService,
    // private readonly _plateDelete: PlateDeleteService,
  ) {}

  async create(data: CreatePlateDto): Promise<PlateDto> {
    const raw = await this._plateCreator.create(data);
    return new PlateDto(raw);
  }

  async process(id: number): Promise<ResultDto> {
    const raw = await this._plateCreator.process(id);
    return new ResultDto(raw);
  }

  async get(plateId: number): Promise<PlateDto> {
    const raw = await this._plateGetter.findById(plateId);
    return new PlateDto(raw);
  }
  // async delete(data: CreatePlateDto): Promise<PlateDto> {
  //   const raw = await this._plateCreator.create(data);
  //   return new PlateDto(raw);
  // }
}
