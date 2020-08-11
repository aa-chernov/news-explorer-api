# news-explorer-api
______________________

## Дипломный проект в Я.Практикуме. Бэкенд.
______________________

__version 0.0.2__

### Ссылки на проект:

- публичный IP-адрес: 
- доменное имя: 

### Версии:

- 0.0.1 Инициализация инфраструктурных файлов;
- 0.0.2 Реализован основной функционал.

### Основные технологии используемые в этом проекте:

- JavaScript;
- Node.js;
- express.js;
- MongoDB;
- Mongoose.

### Функционал проекта:

- реализован сценарий npm:
    * команда `npm run start` запускает сервер на `localhost:3000`;
    * команда `npm run dev` запускает сервер на `localhost:3000` с хот релоудом;

- реализована работа роутов:
    * запрос на `GET /users/me` возвращает информацию о пользователе (email и имя);
    * `GET /articles` возвращает все сохранённые пользователем статьи;
    * `POST /articles` создаёт статью с переданными в теле данными;
    * `DELETE /articles/articleId` удаляет сохранённую статью по её _id;
    * `POST /signup` создаёт пользователя с переданными в теле данными;
    * `POST /signin` возвращает JWT, если в теле запроса переданы правильные почта и пароль.
