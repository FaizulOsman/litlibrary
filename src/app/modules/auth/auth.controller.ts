import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const { result, refreshToken, accessToken } = await AuthService.insertIntoDB(
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
    message: 'Signed up successfully',
    data: { result, accessToken },
  });
});

export const AuthController = {
  insertIntoDB,
};
