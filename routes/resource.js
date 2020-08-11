const resourceRouter = require('express').Router();
const NotFoundError = require('../errors/notFoundError');
const constants = require('../constants');

resourceRouter.all('*', (req, res, next) => {
  next(new NotFoundError(constants.NOT_FOUND));
});

module.exports = resourceRouter;
