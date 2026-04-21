import Joi from 'joi';

interface ValidationResult { valid: boolean; errors: string[]; }
const fmt = (e: Joi.ValidationError) => e.details.map(d => d.message.replace(/"/g, ''));

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateLogin = (data: unknown): ValidationResult => {
  const { error } = loginSchema.validate(data, { abortEarly: false });
  return { valid: !error, errors: error ? fmt(error) : [] };
};
