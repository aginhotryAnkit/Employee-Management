import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

export interface IDepartment {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type DepartmentCreationAttributes = Optional<IDepartment, 'id'>;

class Department extends Model<IDepartment, DepartmentCreationAttributes> implements IDepartment {
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Department.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, modelName: 'Department', tableName: 'departments' }
);

export default Department;
