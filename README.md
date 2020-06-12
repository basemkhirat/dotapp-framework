# DOTAPP

A light-weight, thin and full-featured framework built on express framework with minimum dependencies.
It was shipped with modules which save your time and effort to build it from scratch like users, roles an media

## Requirements

- nodejs >= 8.0.0
- npm >= 3.0.0
- git
- mongodb

## Configuration

- Rename the file `.env.example` to `.env`.
- change app, database other conf according to your enviroment.

The `.env` file apears like this:

``` bash
NODE_ENV=development
APP_DEBUG=true
APP_URL=http://localhost:3000
APP_PORT=3000
APP_PROXY=true

TOKEN_SECRET=k%!$^I4lkj31r$231rkvmmdks231@!$!RFsaf
TOKEN_EXPIRES=604800

DB_URL=mongodb://localhost/mydatabase
DB_USER=
DB_PASS=

CACHE_DRIVER=file
CACHE_TTL=88

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_DB=0
REDIS_PREFIX=
REDIS_PASS=

MAIL_DRIVER=stream
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=
MAIL_PASSWORD=

AWS_KEY=
AWS_SECRET=
YOUTUBE_KEY=
SOUNDCLOUD_KEY=
```


## Installation

```bash
git clone https://github.com/basemkhirat/dotapp
npm install
npm run dev
```

Server will be created at port 3000 by default. you can change the port later from app configurations.

Browse `http://localhost:3000` and have fun.


## Documentations


[Documentation](https://github.com/basemkhirat/mehtara_api/services)


## Author
[Basem Khirat](http://basemkhirat.com) - [basemkhirat@gmail.com](mailto:basemkhirat@gmail.com)


## Bugs, Suggestions and Contributions

Thanks to [everyone](https://github.com/basemkhirat/express-mvc/graphs/contributors)
who has contributed to this project!

Please use [Github](https://github.com/basemkhirat/express-mvc) for reporting bugs,
and making comments or suggestions.

## License

MIT




