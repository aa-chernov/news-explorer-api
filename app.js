require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const articlesPath = require('./routes/articles');
const usersPath = require('./routes/users');
const resourcePath = require('./routes/resource');
const serverError = require('./middlewares/serverError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, HOST } = process.env;

const app = express();

mongoose.connect(HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', articlesPath);
app.use('/', usersPath);
app.use('/', resourcePath);
app.use(errorLogger);
app.use(errors());
app.use('/', serverError);

app.listen(PORT, () => {
  console.log(`Слушаем порт: ${PORT}`);
});
