const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth');
const BadRequestError = require('../errors/badRequestError');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

articlesRouter.route('/articles')
  .get(auth, getArticles)
  .post(auth, celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom((value) => {
        if (!validator.isURL(value)) {
          throw new BadRequestError('Введите URL-ссылку');
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
