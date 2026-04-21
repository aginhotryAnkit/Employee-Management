import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

export interface IUserInvite {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  is_used: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserInviteCreationAttributes = Optional<IUserInvite, 'id' | 'is_used'>;

class UserInvite extends Model<IUserInvite, UserInviteCreationAttributes> implements IUserInvite {
  public id!: string;
  public user_id!: string;
  public token!: string;
  public expires_at!: Date;
  public is_used!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserInvite.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'id' } },
    token: { type: DataTypes.STRING, allowNull: false, unique: true },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    is_used: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, modelName: 'UserInvite', tableName: 'user_invites' }
);

export default UserInvite;
