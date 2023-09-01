import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUserLoginResponse } from './auth.interface';
import { AuthService } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const { result, refreshToken, accessToken } = await AuthService.signUp(
    userData
  );

  // set refresh token in the browser cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: { result, accessToken },
  });
});

const login: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthService.login(loginData);

  const { refreshToken, ...accessToken } = result;

  // set refresh token in the browser cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signed in successfully',
    data: accessToken,
  });
});

export const AuthController = {
  signUp,
  login,
};
