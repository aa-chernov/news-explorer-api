const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth');
const BadRequestError = require('../errors/badRequestError');
const {
  getUser,
  createUser,
  login,
} = require('../controllers/users');

usersRouter
  .post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), login)
  .post('/signup', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30)
        .required()
        .custom((url) => {
          if (!validator.isURL(url)) {
            throw new BadRequestError('Введите URL-ссылку');
          }
          return url;
        }),
    }),
  }), createUser);
usersRouter
  .get('/users/me', auth, getUser);

module.exports = usersRouter;
