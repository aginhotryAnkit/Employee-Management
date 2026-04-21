import { Request, Response } from 'express';
import { loginService } from './auth.service';
import { validateLogin } from './auth.validator';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { valid, errors } = validateLogin(req.body);
  if (!valid) { res.status(400).json({ message: 'Validation failed', errors }); return; }

  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || 'Login failed' });
  }
};
