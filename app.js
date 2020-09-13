require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { articlesRouter, usersRouter, resourceRouter } = require('./routes/index');
const serverError = require('./middlewares/serverError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT } = require('./config');

const app = express();

mongoose.connect('mongodb://localhost:27017/news-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', articlesRouter);
app.use('/', usersRouter);
app.use('/', resourceRouter);
app.use(cors());
app.use(errorLogger);
app.use(errors());
app.use('/', serverError);

app.listen(PORT, () => {
  console.log(`Слушаем порт: ${PORT}`);
});

/*
require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { articlesRouter, usersRouter, resourceRouter } = require('./routes/index');
const serverError = require('./middlewares/serverError');

// const whitelist = ['http://localhost:8080', 'http://localhost:3000', 'https://aa-chernov.github.io/news-explorer-frontend/pages/index.html#',
//   'https://aa-chernov.github.io', 'https://api.news-explorers.tk', 'https://news-explorers.tk', 'http://api.news-explorers.tk', 'http://news-explorers.tk'];

// const corsOptions = {
//   origin(origin, callback) {
//     console.log(origin);
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT } = require('./config');

const app = express();

mongoose.connect('mongodb://localhost:27017/news-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(cookieParser());
app.use(cors());
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

*/
