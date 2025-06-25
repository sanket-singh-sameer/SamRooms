const Joi = require('joi');

const reviewSchemaValidation = Joi.object({
  comment: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  createdAt: Joi.date().default(() => new Date())
});

module.exports = reviewSchemaValidation;