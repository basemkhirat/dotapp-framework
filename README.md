# <div style="text-align:center">DotApp</div>

A tiny, light-weight and full-featured nodejs framework built on express.js with minimum dependencies.

DOTAPP is shipped with a combination of open-source libraries that are fully integrated to save the development time like users, roles an media.

## Requirements

- nodejs >= 8.0.0
- npm >= 3.0.0
- git
- mongodb

## Installation

```bash
$ npm install -g dotapp-cli
$ dotapp new blog
$ cd blog
$ npm install
```

## Configuration

1. Rename the file `.env.example` to `.env`.
2. Change configurations in `.env` according to your environment.
The `.env` file apears like this:

    ``` bash
    NODE_ENV=development
    APP_DEBUG=true
    APP_URL=http://localhost:3000
    APP_PORT=3000

    TOKEN_SECRET=
    TOKEN_EXPIRES=604800

    DB_URL=mongodb://localhost/mydatabase
    DB_USER=
    DB_PASS=
    ```

3. Generate a new TOKEN_SECRET using this command:

    ``` bash
    $ node run secret:generate

    Secret key updated successfully!
    ```
4. Create the administrator user using this comamnd:

    ``` bash
    $ node run user:create

    First Name *: basem
    Last Name *: khirat
    Email *: basemkhirat@gmail.com
    Password *: ********

    User created successfully!
    ```


## Environments

- For `developement`: set the `NODE_ENV=development` and
`APP_DEBUG=true` in `.env` file and run the `dev` command.

``` bash
$ npm run dev
```

- For `production`: set the `NODE_ENV=production` and
`APP_DEBUG=false` in `.env` file and run the `start` command.

``` bash
$ npm start
```

Server will listen at port 3000 by default. you can change the port later from app configurations.


Here you can browse your API Documentation `http://localhost:3000/docs`

## Documentation


- [Routes](https://github.com/basemkhirat/dotapp-core/blob/master/manual/routes.md)

- [Controllers](https://github.com/basemkhirat/dotapp-core/blob/master/manual/controllers.md)

- [Middlewares](https://github.com/basemkhirat/dotapp-core/blob/master/manual/middlewares.md)

- [Request](https://github.com/basemkhirat/dotapp-core/blob/master/manual/request.md)

- [Response](https://github.com/basemkhirat/dotapp-core/blob/master/manual/response.md)

- [Models](https://github.com/basemkhirat/dotapp-core/blob/master/manual/models.md)

- [Authentication](https://github.com/basemkhirat/dotapp-core/blob/master/manual/authentication.md)

- [Authorization](https://github.com/basemkhirat/dotapp-core/blob/master/manual/authorization.md)

- [Public Assets](https://github.com/basemkhirat/dotapp-core/blob/master/manual/public.md)

- [Commands](https://github.com/basemkhirat/dotapp-core/blob/master/manual/commands.md)


- Services:

    - [Cache](https://github.com/basemkhirat/dotapp-core/blob/master/manual/services/cache.md)

    - [Config](https://github.com/basemkhirat/dotapp-core/blob/master/manual/services/config.md)

    - [HTTP](https://github.com/basemkhirat/dotapp-core/blob/master/manual/services/http.md)

    - [Log](https://github.com/basemkhirat/dotapp-core/blob/master/manual/services/log.md)

    - [Mail](https://github.com/basemkhirat/dotapp-core/blob/master/manual/services/mail.md)

    - [Media](https://github.com/basemkhirat/dotapp-core/blob/master/manual/services/media.md)

    - [Storage](https://github.com/basemkhirat/dotapp-core/blob/master/manual/services/storage.md)

    - [Validation](https://github.com/basemkhirat/dotapp-core/blob/master/manual/services/validation.md)

- [Restful API Documentation](https://github.com/basemkhirat/dotapp-core/blob/master/manual/docs.md)


## Author
[Basem Khirat](http://basemkhirat.com) - [basemkhirat@gmail.com](mailto:basemkhirat@gmail.com)


## Bugs, Suggestions and Contributions

Thanks to [everyone](https://github.com/basemkhirat/dotapp-framework/graphs/contributors)
who has contributed to this project!

Please use [Github](https://github.com/basemkhirat/dotapp-framework) for reporting bugs,
and making comments or suggestions.

## License

MIT




