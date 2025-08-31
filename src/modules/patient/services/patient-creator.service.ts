import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
@Injectable()
export class PatientCreatorService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(data: ICreatePatient) {
    const patient = this._prisma.patient.create({ data });
    return patient;
  }
}
export interface ICreatePatient {
  firstName: string;
  lastName: string;
  number: string;
}
