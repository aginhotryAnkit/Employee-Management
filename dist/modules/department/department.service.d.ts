import Department from '../../database/models/department.model';
import { ICreateDepartmentPayload } from './department.interface';
export declare const createDepartmentService: (payload: ICreateDepartmentPayload) => Promise<{
    message: string;
    department: Department;
}>;
export declare const getDepartmentsService: () => Promise<Department[]>;
export declare const updateDepartmentService: (id: string, payload: ICreateDepartmentPayload) => Promise<{
    message: string;
    department: Department;
}>;
export declare const deleteDepartmentService: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=department.service.d.ts.map