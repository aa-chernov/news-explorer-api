const mongoose = require('mongoose');
const validator = require('validator');

/*
keyword — ключевое слово, по которому статью нашли. Обязательное поле-строка.

title — заголовок статьи. Обязательное поле-строка.

text — текст статьи. Обязательное поле-строка.

date — дата статьи. Обязательное поле-строка.

source — источник статьи. Обязательное поле-строка.

link — ссылка на статью. Обязательное поле-строка. Должно быть URL-адресом.

image — ссылка на иллюстрацию к статье. Обязательное поле-строка. Должно быть URL-адресом.

owner — _id пользователя, сохранившего статью. Нужно задать поведение по умолчанию,
        чтобы база данных не возвращала это поле.
*/

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Здесь должна быть ссылка',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Здесь должна быть ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = mongoose.model('card', articleSchema);
