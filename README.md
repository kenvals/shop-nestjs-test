## Описание - Тестовый проект Products API

Обязательные поля товара: id, name.

Требуемые методы в API:

Публичные:
### (выполнено) Список товаров, с постраничным разбиением
```
GET http://127.0.0.1:5000/api/products?limit=1&skip=0 
```

### (выполнено) Получение товара по id (добавить кеширование на 1 минуту)
```
GET http://127.0.0.1:5000/api/products/fetch?id=2
```
Кеш на 60 секунд

### (выполнено)Авторизация по почте и паролю. Возвращает JWT
```
POST http://127.0.0.1:5000/api/users/login
```

data (JSON):
```
{
    "email":"my@localhost.ru",
    "password":"123456"
}
```

Приватные (Авторизация по JWT):

### (выполнено)Добавление товара
```
POST http://127.0.0.1:5000/api/products
```


```
{
    "name":"new product"
    "category":"other"
}
```
не забывай сначала получить токен, через авторизацию

### (выполнено)Редактирование товара по id
```
PATCH http://127.0.0.1:5000/api/products/fetch?id=2
```

```
{
    "name": "dresses for the evening New2",
    "category":2
}
```

не забывай сначала получить токен, через авторизацию

## Поднятие MYSQL
docker-compose up -d

## Запуск
- Создать файл .env (ENV FILE)

```
DB_HOST='127.0.0.1'
DB_PORT=3308
DB_USERNAME='root'
DB_PASSWORD='root'
DB_DATABASE='new_base'
DB_SYNCH=true
```

- Собрать пакеты из учета локального репозитория package.json (Без sudo может быть ошибка, из-за bcrypt, которому необходим хлам ОС)

```
sudo npm install
```

- Запустить проект в режиме горячей отладки 

```
npm run start:dev
```

- Проверить Swagger API Collection

```
http://127.0.0.1:5000/api
```