# <div style="text-align:center">DotApp</div>

A Tiny, light-weight and full-featured framework built on express.js with minimum dependencies.

DOTAPP was shipped with built-in modules which save the development time and efforts like users, roles an media.

## Requirements

- nodejs >= 8.0.0
- npm >= 3.0.0
- git
- mongodb

## Installation

```bash
git clone https://github.com/basemkhirat/dotapp
npm install
```

## Configuration

- Rename the file `.env.example` to `.env`.
- change app, database other configurations according to your environment.

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

Create the administrator user using this comamnd.

``` bash
$ node run user:create

First Name *: basem
Last Name *: khirat
Email *: basemkhirat@gmail.com
Password *: ********

User created successfully!
```

## Environments

### Development

- For developement: set the `NODE_ENV=development` and
`APP_DEBUG=true` in `.env` file and run the `dev` command.

``` bash
npm run dev
```

- For production: set the `NODE_ENV=production` and
`APP_DEBUG=false` in `.env` file and run the `start` command.

``` bash
npm start
```

Server will be created at port 3000 by default. you can change the port later from app configurations.


Here you can browse your API Documentation `http://localhost:3000/docs`

![Test Image 7](/manual/images/docs.png)

## Documentation


- [Routes](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/routes.md)

- [Controllers](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/controllers.md)

- [Middlewares](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/middlewares.md)

- [models](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/models.md)

- [Commands](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/commands.md)

- Services:

    - [Cache](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/services/cache.md)

    - [Config](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/services/config.md)

    - [HTTP](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/services/http.md)

    - [Log](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/services/log.md)

    - [Mail](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/services/mail.md)

    - [Media](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/services/media.md)

    - [Storage](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/services/storage.md)

    - [Validation](https://github.com/basemkhirat/dotapp-framework/blob/master/manual/services/validation.md)


## Author
[Basem Khirat](http://basemkhirat.com) - [basemkhirat@gmail.com](mailto:basemkhirat@gmail.com)


## Bugs, Suggestions and Contributions

Thanks to [everyone](https://github.com/basemkhirat/dotapp-framework/graphs/contributors)
who has contributed to this project!

Please use [Github](https://github.com/basemkhirat/dotapp-framework) for reporting bugs,
and making comments or suggestions.

## License

MIT




