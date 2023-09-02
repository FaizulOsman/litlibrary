/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { IUserLogin, IUserLoginResponse } from './auth.interface';

const signUp = async (payload: User): Promise<any> => {
  // // Hash the password before saving it in the database
  // const hashedPassword = await bcrypt.hash(payload.password, 10); // Adjust the salt rounds as needed

  // const userDataWithHashedPassword = {
  //   ...payload,
  //   password: hashedPassword,
  // };

  // const { password, ...result } = await prisma.user.create({
  //   data: userDataWithHashedPassword,
  // });
  const { password, ...result } = await prisma.user.create({ data: payload });
  console.log(password);

  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const oneYearInSeconds = 31536000; // Number of seconds in one year
  const iatForOneYear = now + oneYearInSeconds; // Calculate the iat value for one year from now

  let accessToken;
  let refreshToken;
  if (result) {
    accessToken = jwtHelpers.createToken(
      {
        role: result.role,
        userId: result.id,
        iat: iatForOneYear,
      },
      config.jwt.secret as Secret,
      '365d'
    );

    refreshToken = jwtHelpers.createToken(
      {
        role: result.role,
        userId: result.id,
        iat: iatForOneYear,
      },
      config.jwt.refresh_secret as Secret,
      '365d'
    );
  }

  return { result, refreshToken, accessToken };
};

const login = async (payload: IUserLogin): Promise<IUserLoginResponse> => {
  const { email, password } = payload;
  const isUserExist = await prisma.user.findUnique({ where: { email } });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Verify the password
  if (isUserExist?.password && password !== isUserExist.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const oneYearInSeconds = 31536000; // Number of seconds in one year
  const iatForOneYear = now + oneYearInSeconds; // Calculate the iat value for one year from now

  const { id, role } = isUserExist;

  // Generate JWT tokens
  const accessToken = jwtHelpers.createToken(
    {
      role: role,
      userId: id,
      iat: iatForOneYear,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      role: role,
      userId: id,
      iat: iatForOneYear,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    userData: isUserExist,
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  signUp,
  login,
};
