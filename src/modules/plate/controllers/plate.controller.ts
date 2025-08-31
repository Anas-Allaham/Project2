import { PlateApiService } from './plate-api.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PlateDto } from '../dtos/plate.dto';
import { CreatePlateDto } from '../dtos/create-plate.dto';
import { ResultDto } from '../dtos/result.dto';

@ApiTags('Plate')
@Controller('Plate')
export class PlateController {
  constructor(private readonly _plateApiService: PlateApiService) {}

  @Post()
  @ApiResponse({ type: CreatePlateDto })
  @ApiOperation({ summary: 'Create a new plate' })
  async create(@Body() data: CreatePlateDto) {
    return this._plateApiService.create(data);
  }

  @Post('Process')
  @ApiResponse({ type: ResultDto })
  @ApiOperation({ summary: 'Start Processing' })
  async process(@Param('id') id: number) {
    return this._plateApiService.process(id);
  }

  @Get(':id')
  @ApiResponse({ type: PlateDto })
  @ApiOperation({ summary: 'Get a Plate by ID' })
  async findOne(@Param('id') id: number) {
    return this._plateApiService.get(id);
  }

  // @Get()
  // @ApiResponse({ type: FindAllUserDto })
  // @ApiOperation({ summary: 'Get all users' })
  // async findAll(
  //   @Query() pagination: PaginationDto,
  //   @Query() filter?: UserFilterDto,
  // ) {
  //   return this._userApiService.getAll(pagination, filter);
  // }

  // @Patch(':id')
  // @ApiResponse({ type: UserDto })
  // @ApiOperation({ summary: 'Update a user by ID' })
  // async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //   return this._userApiService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a user by ID' })
  // async remove(@Param('id') id: number) {
  //   return this._userApiService.delete(id);
  // }
}
