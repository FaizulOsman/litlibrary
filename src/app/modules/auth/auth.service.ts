/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (payload: User): Promise<any> => {
  const result = await prisma.user.create({ data: payload });
  // console.log(password);

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
      '1d' // Set a default expiration of 1 day (you can adjust this as needed)
    );

    refreshToken = jwtHelpers.createToken(
      {
        role: result.role,
        userId: result.id,
        iat: 1516239022,
      },
      config.jwt.refresh_secret as Secret,
      '7d' // Set a default refresh token expiration of 7 days (you can adjust this as needed)
    );
  }
  console.log(accessToken);

  return { result, refreshToken, accessToken };
};

export const AuthService = {
  insertIntoDB,
};
