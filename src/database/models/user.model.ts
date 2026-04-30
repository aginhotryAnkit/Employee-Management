import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import Role from './role.model';
import Department from './department.model';
import UserInvite from './user_invite.model';

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

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string | null;
  public role_id!: string;
  public department_id!: string;
  public manager_id!: string | null;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    role_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'roles', key: 'id' } },
    department_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'departments', key: 'id' } },
    manager_id: { type: DataTypes.UUID, allowNull: true, references: { model: 'users', key: 'id' } },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, modelName: 'User', tableName: 'users' }
);

// Associations
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
User.belongsTo(User, { foreignKey: 'manager_id', as: 'manager' });
User.hasMany(UserInvite, { foreignKey: 'user_id', as: 'invites' });
UserInvite.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Department.belongsTo(User, { foreignKey: 'head_id', as: 'head' });

export default User;
