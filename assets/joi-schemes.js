const { celebrate, Joi } = require('celebrate');

const validatecard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    text: Joi.string().required().uri(),
  }),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports = {
  validatecard,
  validateRegistration,
  validateLogin,
};
