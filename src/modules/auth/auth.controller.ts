import { Request, Response } from 'express';
import { signupService, loginService } from './auth.service';
import { validateSignup, validateLogin } from './auth.validator';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { valid, errors } = validateSignup(req.body);
  if (!valid) {
    res.status(400).json({ message: 'Validation failed', errors });
    return;
  }

  try {
    const result = await signupService(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { valid, errors } = validateLogin(req.body);
  if (!valid) {
    res.status(400).json({ message: 'Validation failed', errors });
    return;
  }

  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || 'Login failed' });
  }
};
