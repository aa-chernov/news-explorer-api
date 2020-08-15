require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { articlesRouter, usersRouter, resourceRouter } = require('./routes/index');
const serverError = require('./middlewares/serverError');
const limiter = require('./middlewares/limiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// const { PORT, HOST } = require('./config');
const { PORT = 3000 } = process.env;

const app = express();

// mongoose.connect(HOST, {
mongoose.connect('mongodb://localhost:27017/news-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', articlesRouter);
app.use('/', usersRouter);
app.use('/', resourceRouter);
app.use(errorLogger);
app.use(errors());
app.use('/', serverError);

app.listen(PORT, () => {
  console.log(`Слушаем порт: ${PORT}`);
});
