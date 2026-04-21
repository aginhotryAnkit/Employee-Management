import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/models/user.model';
import Role from '../database/models/role.model';

export interface AuthRequest extends Request {
  user?: { id: string; name: string; email: string; role: string };
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

    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'is_active'],
      include: [{ model: Role, as: 'role', attributes: ['name'] }],
    });

    if (!user) { res.status(401).json({ message: 'User not found' }); return; }
    if (!user.is_active) { res.status(403).json({ message: 'Account not activated' }); return; }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: (user as any).role?.name,
    };

    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};
