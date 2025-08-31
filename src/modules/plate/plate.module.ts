import { Module } from '@nestjs/common';
import { PlateController } from './controllers/plate.controller';
import { PlateApiService } from './controllers/plate-api.service';
import { PlateGetterService } from './services/plate-getter.service';
import { PlateCreatorService } from './services/plate-creator.service';

@Module({
  controllers: [PlateController],
  providers: [PlateApiService, PlateGetterService, PlateCreatorService],
  exports: [PlateGetterService, PlateCreatorService],
})
export class PlateModule {}
