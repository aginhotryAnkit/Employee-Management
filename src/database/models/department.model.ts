import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

export interface IDepartment {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  head_id?: string | null;
  location?: string | null;
  budget?: number | null;
  status: 'ACTIVE' | 'INACTIVE';
  created_by?: string | null;
  updated_by?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type DepartmentCreationAttributes = Optional<IDepartment, 'id' | 'description' | 'head_id' | 'location' | 'budget' | 'status' | 'created_by' | 'updated_by'>;

class Department extends Model<IDepartment, DepartmentCreationAttributes> implements IDepartment {
  public id!: string;
  public name!: string;
  public code!: string;
  public description!: string | null;
  public head_id!: string | null;
  public location!: string | null;
  public budget!: number | null;
  public status!: 'ACTIVE' | 'INACTIVE';
  public created_by!: string | null;
  public updated_by!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Department.init(
  {
    id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name:        { type: DataTypes.STRING, allowNull: false, unique: true },
    code:        { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    head_id:     { type: DataTypes.UUID, allowNull: true },
    location:    { type: DataTypes.STRING, allowNull: true },
    budget:      { type: DataTypes.DECIMAL(12, 2), allowNull: true },
    status:      { type: DataTypes.ENUM('ACTIVE', 'INACTIVE'), defaultValue: 'ACTIVE' },
    created_by:  { type: DataTypes.UUID, allowNull: true },
    updated_by:  { type: DataTypes.UUID, allowNull: true },
  },
  { sequelize, modelName: 'Department', tableName: 'departments' }
);

export default Department;
