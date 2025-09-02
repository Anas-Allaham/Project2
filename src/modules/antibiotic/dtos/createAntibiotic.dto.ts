import { ApiProperty } from '@nestjs/swagger';

export class CreateAntiBioticDto {
  @ApiProperty()
  name: string;
}
