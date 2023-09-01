/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (payload: User): Promise<any> => {
  // Hash the password before saving it in the database
  const hashedPassword = await bcrypt.hash(payload.password, 10); // Adjust the salt rounds as needed

  const userDataWithHashedPassword = {
    ...payload,
    password: hashedPassword,
  };

  const { password, ...result } = await prisma.user.create({
    data: userDataWithHashedPassword,
  });
  // const { password, ...result } = await prisma.user.create({ data: payload });
  console.log(password);

  let accessToken;
  let refreshToken;
  if (result) {
    accessToken = jwtHelpers.createToken(
      {
        role: result.role,
        userId: result.id,
        iat: 1516239022,
      },
      config.jwt.secret as Secret,
      '1d'
    );

    refreshToken = jwtHelpers.createToken(
      {
        role: result.role,
        userId: result.id,
        iat: 1516239022,
      },
      config.jwt.refresh_secret as Secret,
      '7d'
    );
  }

  return { result, refreshToken, accessToken };
};

export const AuthService = {
  insertIntoDB,
};
