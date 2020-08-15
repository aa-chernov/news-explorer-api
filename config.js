require('dotenv').config();

const {
  PORT = 3000,
  HOST,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  HOST: NODE_ENV === 'production' ? HOST : 'mongodb://localhost:27017/news-explorer',
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'super-puper-dev-secret',
};
