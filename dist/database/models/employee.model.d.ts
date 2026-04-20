import { Model, Optional } from 'sequelize';
import { IEmployee } from '../../modules/auth/auth.interface';
type EmployeeCreationAttributes = Optional<IEmployee, 'id' | 'role'>;
declare class Employee extends Model<IEmployee, EmployeeCreationAttributes> implements IEmployee {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'employee';
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default Employee;
//# sourceMappingURL=employee.model.d.ts.map