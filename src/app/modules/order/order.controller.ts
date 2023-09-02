import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await OrderService.createOrder(req.body, user?.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await OrderService.getAllOrders(user?.userId, user?.role);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getSingleOrder: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await OrderService.getSingleOrder(
    req.params.orderId,
    user?.userId,
    user?.role
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
