const path = require('path');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
// eslint-disable-next-line import/no-dynamic-require
const Article = require(path.join('..', 'models', 'article'));

module.exports.getArticles = (req, res, next) => {
  Article
    .find({})
    .then((articles) => res.send({ data: articles }))
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
        next(new BadRequestError('Упс! Что-то не так...'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params)
    // eslint-disable-next-line consistent-return
    .then((article) => {
      if (!article) {
        next(new NotFoundError('Нет такой статьи'));
      } else if (article.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Вы не можете удалить эту статью'));
      } else {
        return Article.findByIdAndRemove(req.params._id)
          .then((articleForDel) => {
            res.send({ message: `Удалена статья "${articleForDel.title}" с id ${articleForDel._id}` });
          })
          .catch(next);
      }
    })
    .catch(next);
};
