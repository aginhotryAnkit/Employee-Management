import { Request, Response } from 'express';
import { loginService } from './auth.service';
import { validateLogin } from './auth.validator';
import { sendSuccess, sendError } from '../../utils/response';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { valid, errors } = validateLogin(req.body);
  if (!valid) { sendError({ res, statusCode: 400, message: 'Validation failed', errors }); return; }

  try {
    const result = await loginService(req.body);
    sendSuccess({ res, statusCode: 200, message: result.message, data: result });
  } catch (err: any) {
    sendError({ res, statusCode: err.status || 500, message: err.message || 'Login failed' });
  }
};
