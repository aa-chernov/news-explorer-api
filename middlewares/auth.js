const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const constants = require('../constants');

const { JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(constants.NO_AUTH));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(constants.NO_AUTH));
  }

  req.user = payload;

  next();
};
