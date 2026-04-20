export interface IEmployee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'employee';
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  message: string;
  token: string;
  employee: Omit<IEmployee, 'password'>;
}
