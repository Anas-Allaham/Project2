import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { RawUser } from '../dtos/user.dto';
import { HashPasswordService } from 'src/modules/common/services/hash-passowrd.service';
import { selectUserValidator } from '../validators/select-user-validator';

@Injectable()
export class UserCreatorService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _hashService: HashPasswordService,
  ) {}

  async create(data: ICreateUser): Promise<RawUser> {
    const hashedPassword = await this._hashService.hashPassword(data.password);

    return await this._prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        userRoleId: 1,
      },
      select: selectUserValidator(),
    });
  }
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
