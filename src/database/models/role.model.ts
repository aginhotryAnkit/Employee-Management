import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

export interface IRole {
  id: string;
  name: 'hr' | 'manager' | 'employee';
  createdAt?: Date;
  updatedAt?: Date;
}

type RoleCreationAttributes = Optional<IRole, 'id'>;

class Role extends Model<IRole, RoleCreationAttributes> implements IRole {
  public id!: string;
  public name!: 'hr' | 'manager' | 'employee';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.ENUM('hr', 'manager', 'employee'), allowNull: false, unique: true },
  },
  { sequelize, modelName: 'Role', tableName: 'roles' }
);

export default Role;
