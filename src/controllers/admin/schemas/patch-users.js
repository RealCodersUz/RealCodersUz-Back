const Joi = require("joi");

exports.patchAdminSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string().min(8),
});
