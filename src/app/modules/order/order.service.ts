import { Order, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (data: Order, userId: string): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      ...data,
      userId,
      orderedBooks: data.orderedBooks as Prisma.InputJsonValue,
    },
  });

  return result;
};

const getAllOrders = async (
  userId: string,
  role: string
): Promise<Order[] | null> => {
  let result = null;
  if (role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        userId,
      },
    });
  }

  if (role === 'admin') {
    result = await prisma.order.findMany({});
  }

  return result;
};

const getSingleOrder = async (
  id: string,
  userId: string,
  role: string
): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (role === 'customer') {
    if (result?.userId !== userId) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not allowed to access this data.'
      );
    }
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
