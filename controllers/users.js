const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');
const constants = require('../constants');

const { JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new BadRequestError(constants.NO_USER_DATA);
    } else {
      return User.findUserByCredentials(email, password)
        .then((user) => {
          const token = jwt.sign(
            { _id: user._id }, JWT_SECRET, { expiresIn: '7d' },
          );
          res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
              sameSite: true,
            })
            .send({ _id: user._id, message: 'Авторизация выполнена успешно' });
        })
        .catch(() => {
          next(new UnauthorizedError(constants.AUTH_ERROR));
        });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User
      .create({
        name,
        email,
        password: hash,
      }))
    .then((user) => res
      .status(201)
      .send({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        message: `Создан пользователь: ${name}`,
      }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(constants.USER_DUPLICATE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(constants.BAD_REQ));
      } else {
        next(err);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};
