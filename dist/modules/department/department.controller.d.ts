import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
export declare const createDepartment: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getDepartments: (_req: AuthRequest, res: Response) => Promise<void>;
export declare const updateDepartment: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteDepartment: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=department.controller.d.ts.map