const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const constants = require('../constants');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw next(new UnauthorizedError(constants.NO_AUTH));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw next(new UnauthorizedError(constants.NO_AUTH));
  }

  req.user = payload;

  next();
};

/*
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const constants = require('../constants');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   throw next(new UnauthorizedError(constants.NO_AUTH));
  // }

  // const token = authorization.replace('Bearer ', '');
  // let payload;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw next(new UnauthorizedError(constants.NO_AUTH));
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw next(new UnauthorizedError(constants.NO_AUTH));
  }

  req.user = payload;

  next();
};

*/
