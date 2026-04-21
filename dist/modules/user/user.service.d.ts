import User from '../../database/models/user.model';
import { ICreateUserPayload, ISetPasswordPayload } from './user.interface';
export declare const createUserService: (payload: ICreateUserPayload) => Promise<{
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    invite_token: string;
}>;
export declare const setPasswordService: (payload: ISetPasswordPayload) => Promise<{
    message: string;
}>;
export declare const getUsersService: (requesterId: string, requesterRole: string) => Promise<User[]>;
export declare const deleteUserService: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=user.service.d.ts.map