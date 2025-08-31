import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreatePlateDto } from 'src/modules/plate/dtos/create-plate.dto';
import { AntibioticApiService } from './antibiotic-api.service';

@ApiTags('Antibiotic')
@Controller('antibiotic')
export class AntibioticController {
  constructor(private readonly _antibioticApiService: AntibioticApiService) {}

  @Post()
  @ApiResponse({ type: CreatePlateDto })
  @ApiOperation({ summary: 'Create a new plate' })
  async create() {
    return this._antibioticApiService.create();
  }
}
