import { Response } from 'express';

interface SuccessParams {
  res: Response;
  statusCode?: number;
  message: string;
  data?: any;
}

interface ErrorParams {
  res: Response;
  statusCode?: number;
  message: string;
  errors?: any;
}

export const sendSuccess = ({ res, statusCode = 200, message, data = [] }: SuccessParams): void => {
  res.status(statusCode).json({
    status: true,
    statusCode,
    message,
    response: data,
  });
};

export const sendError = ({ res, statusCode = 500, message, errors = [] }: ErrorParams): void => {
  res.status(statusCode).json({
    status: false,
    statusCode,
    message,
    error: errors,
  });
};
