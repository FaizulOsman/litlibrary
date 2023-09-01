/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: User): Promise<any> => {
  const { password, ...result } = await prisma.user.create({ data });
  console.log(password);

  return result;
};

export const AuthService = {
  insertIntoDB,
};
