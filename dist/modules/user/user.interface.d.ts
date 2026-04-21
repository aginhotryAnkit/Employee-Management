export interface ICreateUserPayload {
    name: string;
    email: string;
    role_id: string;
    department_id: string;
    manager_id?: string;
}
export interface ISetPasswordPayload {
    token: string;
    password: string;
}
//# sourceMappingURL=user.interface.d.ts.map