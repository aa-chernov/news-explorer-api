const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Число запросов с одного IP ограничено. Сделайте новый запрос через 15 минут',
});

module.exports = limiter;
