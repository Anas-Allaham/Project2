import { Module } from '@nestjs/common';
import { PlateController } from './controllers/plate.controller';
import { PlateApiService } from './controllers/plate-api.service';
import { PlateGetterService } from './services/plate-getter.service';
import { PlateCreatorService } from './services/plate-creator.service';
import { PatientModule } from '../patient/patient.module';
import { PlateUpdatorService } from './services/plate-updater.service';

@Module({
  controllers: [PlateController],
  providers: [
    PlateApiService,
    PlateGetterService,
    PlateCreatorService,
    PlateUpdatorService,
  ],
  exports: [PlateGetterService, PlateCreatorService, PlateUpdatorService],
  imports: [PatientModule],
})
export class PlateModule {}
