# news-explorer-api
______________________

## Дипломный проект в Я.Практикуме. Бэкенд.
______________________

__version 0.0.3__

### Ссылки на проект:

- публичный IP-адрес: `84.201.146.63`

- доменное имя: `https://news-explorers.tk`
- поддомен API: `https://api.news-explorers.tk`

### Версии:

- 0.0.1 Инициализация инфраструктурных файлов;
- 0.0.2 Реализован основной функционал;
- 0.0.3 Внесенные изменения:
    * все роуты подключены в файле index.js, единый роут подключен в app.js;
    * исправлена ошибка в config.js для хоста и ключа;
    * заменено ошибочное сообщение "Ошибка авторизации" на "Неправильные почта или пароль".

### Основные технологии используемые в этом проекте:

- JavaScript;
- Node.js;
- express.js;
- MongoDB;
- Mongoose;
- nginx;
- Яндекс.Облако.

### Функционал проекта:

- поддерживаемые сценарии npm:
    * команда `npm run start` запускает сервер на `localhost:3000`;
    * команда `npm run dev` запускает сервер на `localhost:3000` с автоматической перезагрузкой;

- поддерживаемые возможности API:
    * запрос на `POST /signup` создаёт пользователя с переданными в теле данными;
    * запрос на `POST /signin` возвращает JWT, если в теле запроса переданы правильные почта и пароль;
    * запрос на `GET /users/me` возвращает информацию о пользователе (email и имя);
    * запрос на `GET /articles` возвращает все сохранённые пользователем статьи;
    * запрос на `POST /articles` создаёт статью с переданными в теле данными;
    * запрос на `DELETE /articles/articleId` удаляет сохранённую статью по её _id.
