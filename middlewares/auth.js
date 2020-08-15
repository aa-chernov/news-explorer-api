const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const constants = require('../constants');

// const { JWT_SECRET } = require('../config');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw next(new UnauthorizedError(constants.NO_AUTH));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-puper-dev-secret');
  } catch (err) {
    throw next(new UnauthorizedError(constants.NO_AUTH));
  }

  req.user = payload;

  next();
};
