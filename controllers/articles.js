const Article = require('../models/article');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const constants = require('../constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (!articles) {
        next(new NotFoundError(constants.NO_ARTICLES));
      } else {
        res.send({ data: articles });
      }
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res
      .send({ data: article, message: `Создана статья: "${title}"` }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(constants.BAD_REQ));
      } else {
        next(err);
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params._id)
    .select('+owner')
    .orFail(new NotFoundError(constants.NO_ARTICLE))
    .then((article) => {
      if (JSON.stringify(article.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError(constants.NO_RIGHTS);
      }
      Article.deleteOne(article)
        .then(() => res.send({
          message: `Удалена статья: "${article.title}"`,
        }));
    })
    .catch(next);
};
