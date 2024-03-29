const Joi = require("joi");

patchServicesSchema = Joi.object({
  title_uz: Joi.string(),
  title_ru: Joi.string(),
  title_en: Joi.string(),

  desc_uz: Joi.string(),
  desc_ru: Joi.string(),
  desc_en: Joi.string(),

  //
});

postServicesSchema = Joi.object({
  title_uz: Joi.string().required(),
  title_ru: Joi.string().required(),
  title_en: Joi.string(),

  desc_uz: Joi.string().required(),
  desc_ru: Joi.string().required(),
  desc_en: Joi.string(),

  //
});

getServicesSchema = Joi.object({
  title_uz: Joi.string(),
  title_ru: Joi.string(),
  title_en: Joi.string(),

  desc_uz: Joi.string(),
  desc_ru: Joi.string(),
  desc_en: Joi.string(),
});

module.exports = {
  patchServicesSchema,
  postServicesSchema,
  getServicesSchema,
};

// Services
