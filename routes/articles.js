const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth');
const BadRequestError = require('../errors/badRequestError');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const constants = require('../constants');

articlesRouter.route('/articles')
  .get(auth, getArticles)
  .post(auth, celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().error(() => new BadRequestError(constants.TOO_SHORT)),
      title: Joi.string().required().error(() => new BadRequestError(constants.TOO_SHORT)),
      text: Joi.string().required().error(() => new BadRequestError(constants.TOO_SHORT)),
      date: Joi.date().required().error(() => new BadRequestError(constants.BAD_REQ)),
      source: Joi.string().required().error(() => new BadRequestError(constants.BAD_REQ)),
      link: Joi.string().required().custom((value) => {
        if (!validator.isURL(value)) {
          throw new BadRequestError(constants.NOT_URL);
        }
        return value;
      }),
      image: Joi.string().required().custom((value) => {
        if (!validator.isURL(value)) {
          throw new BadRequestError(constants.NOT_URL);
        }
        return value;
      }),
    }),
  }), createArticle);

articlesRouter.delete('/articles/:_id', auth,
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
    }),
  }), deleteArticle);

module.exports = articlesRouter;
