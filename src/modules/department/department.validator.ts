import Joi from 'joi';

interface ValidationResult { valid: boolean; errors: string[]; }
const fmt = (e: Joi.ValidationError) => e.details.map(d => d.message.replace(/"/g, ''));

const createSchema = Joi.object({
  name:        Joi.string().trim().required(),
  code:        Joi.string().trim().uppercase().required(),
  description: Joi.string().trim().optional(),
  head_id:     Joi.string().uuid().optional(),
  location:    Joi.string().trim().optional(),
  budget:      Joi.number().positive().optional(),
  status:      Joi.string().valid('ACTIVE', 'INACTIVE').optional(),
});

const updateSchema = createSchema.fork(
  ['name', 'code'],
  field => field.optional()
);

export const validateCreateDepartment = (data: unknown): ValidationResult => {
  const { error } = createSchema.validate(data, { abortEarly: false });
  return { valid: !error, errors: error ? fmt(error) : [] };
};

export const validateUpdateDepartment = (data: unknown): ValidationResult => {
  const { error } = updateSchema.validate(data, { abortEarly: false });
  return { valid: !error, errors: error ? fmt(error) : [] };
};
