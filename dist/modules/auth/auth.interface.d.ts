export interface ILoginPayload {
    email: string;
    password: string;
}
export interface IAuthResponse {
    message: string;
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        is_active: boolean;
    };
}
//# sourceMappingURL=auth.interface.d.ts.map