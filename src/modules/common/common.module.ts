import { Module } from '@nestjs/common';
import { HashPasswordService } from './services/hash-passowrd.service';

@Module({
  providers: [HashPasswordService],
  exports: [HashPasswordService],
})
export class CommonModule {}
