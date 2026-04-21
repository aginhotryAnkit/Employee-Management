import { Model, Optional } from 'sequelize';
export interface IDepartment {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}
type DepartmentCreationAttributes = Optional<IDepartment, 'id'>;
declare class Department extends Model<IDepartment, DepartmentCreationAttributes> implements IDepartment {
    id: string;
    name: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default Department;
//# sourceMappingURL=department.model.d.ts.map