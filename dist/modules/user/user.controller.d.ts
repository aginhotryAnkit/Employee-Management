import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
export declare const createUser: (req: AuthRequest, res: Response) => Promise<void>;
export declare const setPassword: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getUsers: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteUser: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map