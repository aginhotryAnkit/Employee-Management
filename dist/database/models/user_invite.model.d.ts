import { Model, Optional } from 'sequelize';
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
declare class UserInvite extends Model<IUserInvite, UserInviteCreationAttributes> implements IUserInvite {
    id: string;
    user_id: string;
    token: string;
    expires_at: Date;
    is_used: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default UserInvite;
//# sourceMappingURL=user_invite.model.d.ts.map