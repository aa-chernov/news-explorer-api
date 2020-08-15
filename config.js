require('dotenv').config();

const {
  PORT,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports.PORT = PORT || 3000;
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'super-puper-dev-secret';
