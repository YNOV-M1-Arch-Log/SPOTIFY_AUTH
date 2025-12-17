// Validation pour l’inscription
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
});

// Validation pour le login
const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().min(6).max(255).required(),
});