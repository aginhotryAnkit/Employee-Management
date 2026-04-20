import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { IEmployee } from '../../modules/auth/auth.interface';

type EmployeeCreationAttributes = Optional<IEmployee, 'id' | 'role'>;

class Employee extends Model<IEmployee, EmployeeCreationAttributes> implements IEmployee {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'employee';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'employee'),
      defaultValue: 'employee',
    },
  },
  { sequelize, modelName: 'Employee', tableName: 'employees' }
);

export default Employee;
