require('dotenv').config();

const {
  PORT,
  HOST,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports.PORT = PORT || 3000;
module.exports.HOST = NODE_ENV === 'production' ? HOST : 'mongodb://localhost:27017/news-explorer';
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'super-puper-dev-secret';
