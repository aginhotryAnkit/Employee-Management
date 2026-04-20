import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Employee from '../database/models/employee.model';

export interface AuthRequest extends Request {
  employee?: Employee;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const employee = await Employee.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
    if (!employee) {
      res.status(401).json({ message: 'Employee not found' });
      return;
    }
    req.employee = employee;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
