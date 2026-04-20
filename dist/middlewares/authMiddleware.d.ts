import { Request, Response, NextFunction } from 'express';
import Employee from '../database/models/employee.model';
export interface AuthRequest extends Request {
    employee?: Employee;
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authMiddleware.d.ts.map