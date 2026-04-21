import { Model, Optional } from 'sequelize';
export interface IRole {
    id: string;
    name: 'hr' | 'manager' | 'employee';
    createdAt?: Date;
    updatedAt?: Date;
}
type RoleCreationAttributes = Optional<IRole, 'id'>;
declare class Role extends Model<IRole, RoleCreationAttributes> implements IRole {
    id: string;
    name: 'hr' | 'manager' | 'employee';
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default Role;
//# sourceMappingURL=role.model.d.ts.map