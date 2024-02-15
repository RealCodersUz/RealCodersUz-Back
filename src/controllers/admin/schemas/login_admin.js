const Joi = require("joi");

exports.loginAdminSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(8),
});
