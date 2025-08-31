import { Prisma } from '@prisma/client';

export const selectUserValidator = () => {
  return Prisma.validator<Prisma.UserSelect>()({
    id: true,
    email: true,
    name: true,
    createdAt: true,
    updatedAt: true,
  });
};
