import Joi from 'joi';
import { ISignupPayload, ILoginPayload } from './auth.interface';

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const signupSchema = Joi.object<ISignupPayload>({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'employee').default('employee'),
});

const loginSchema = Joi.object<ILoginPayload>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const formatErrors = (error: Joi.ValidationError): string[] =>
  error.details.map((d) => d.message.replace(/"/g, ''));

export const validateSignup = (data: unknown): ValidationResult => {
  const { error } = signupSchema.validate(data, { abortEarly: false });
  return { valid: !error, errors: error ? formatErrors(error) : [] };
};

export const validateLogin = (data: unknown): ValidationResult => {
  const { error } = loginSchema.validate(data, { abortEarly: false });
  return { valid: !error, errors: error ? formatErrors(error) : [] };
};
