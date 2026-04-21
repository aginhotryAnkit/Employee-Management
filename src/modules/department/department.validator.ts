import Joi from 'joi';

interface ValidationResult { valid: boolean; errors: string[]; }
const fmt = (e: Joi.ValidationError) => e.details.map(d => d.message.replace(/"/g, ''));

const schema = Joi.object({ name: Joi.string().trim().required() });

export const validateDepartment = (data: unknown): ValidationResult => {
  const { error } = schema.validate(data, { abortEarly: false });
  return { valid: !error, errors: error ? fmt(error) : [] };
};
