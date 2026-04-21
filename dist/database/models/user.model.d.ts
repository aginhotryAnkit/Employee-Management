import { Model, Optional } from 'sequelize';
export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string | null;
    role_id: string;
    department_id: string;
    manager_id: string | null;
    is_active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
type UserCreationAttributes = Optional<IUser, 'id' | 'password' | 'manager_id' | 'is_active'>;
declare class User extends Model<IUser, UserCreationAttributes> implements IUser {
    id: string;
    name: string;
    email: string;
    password: string | null;
    role_id: string;
    department_id: string;
    manager_id: string | null;
    is_active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default User;
//# sourceMappingURL=user.model.d.ts.map