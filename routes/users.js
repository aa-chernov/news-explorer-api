const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const BadRequestError = require('../errors/badRequestError');
const { getUser, createUser, login } = require('../controllers/users');
const constants = require('../constants');

usersRouter
  .post('/signin',
    celebrate({
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
      }),
    }), login)
  .post('/signup',
    celebrate({
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        name: Joi.string().required().max(30).error(() => new BadRequestError(constants.TOO_SHORT)),
      }),
    }), createUser);
usersRouter
  .get('/users/me', auth, getUser);

module.exports = usersRouter;
