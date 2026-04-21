import Joi from 'joi';

interface ValidationResult { valid: boolean; errors: string[]; }
const fmt = (e: Joi.ValidationError) => e.details.map(d => d.message.replace(/"/g, ''));

const createUserSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  role_id: Joi.string().uuid().required(),
  department_id: Joi.string().uuid().required(),
  manager_id: Joi.string().uuid().optional(),
});

const setPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const validateCreateUser = (data: unknown): ValidationResult => {
  const { error } = createUserSchema.validate(data, { abortEarly: false });
  return { valid: !error, errors: error ? fmt(error) : [] };
};

export const validateSetPassword = (data: unknown): ValidationResult => {
  const { error } = setPasswordSchema.validate(data, { abortEarly: false });
  return { valid: !error, errors: error ? fmt(error) : [] };
};
