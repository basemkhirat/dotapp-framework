# Routes

Flexible routes developed on express routes written in an object format.

In `routes/index.js`, you can define your application routes with a javascript object.

You can use an express function in middleware.

``` javascript
// routes/index.js

export default {
    "GET /": (req, res) => {
        return res.ok("Hello world");
    }
}
```

OR you can pass a controller method directly.

``` javascript
// routes/index.js

export default {
    "GET /": "PostsController.index",
    "POST /": "PostsController.create",
    "PUT /:id": "PostsController.update",
    "DELETE /:id": "PostsController.delete",

    // optional params
     "GET /:parent?": "PostsController.index",
}
```

## Nested Routes

You can also define infinite nested routes using `group`.

``` javascript
// routes/index.js

export default {
    "GET /pages": {
        group: {
            "GET /about": "PagesController.about",
            "GET /contact": "PagesController.contact",
            "GET /other_pages" : {
                group: {
                      "GET /privacy": "PagesController.privacy",
                      "GET /terms": "PagesController.terms",
                }
            }
        }
    }
}
```

## Route Middlewares

DotApp is shipped with 3 built-in middlewares which you use them with routes.

#### `authenticate()`

- Authenticate route with a valid token.
- If there is no token passed in `Authorization` header, the route will give 401 unauthenticated.


``` javascript
// routes/index.js

import {authenticate} from '~/dotapp/middlewares';

export default {
    "GET /posts/manage": {
        handler: "PostsController.index",
        middleware: authenticate()
    }
}
```

#### `authorize(<permission>, <param?>)`

- Authorize route against specific permission.
- If the logged user has not the given permission, the route will give 403 access denied.
- Actually this middleware uses the `req.can` to check user permission.

    See: [Authorization](authoriztion.md)


``` javascript
// routes/index.js

import {authorize} from '~/dotapp/middlewares';

export default {
    "GET /posts/manage": {
        handler: "PostsController.index",
        middleware: authorize("posts.manage")
    }
}
```

#### `setMaxHits(rate, <handler?>)`

- setMaxHits sets max number of user requests for any user to use this route.
- `rate` is given in this format `number_of_requests:period`.

    As example `100:60000` allow user to make 100 requests in one minute as maximum.
- If user exceeded the allowed limit, route will give 429 too many requests.


``` javascript
// routes/index.js

import {setMaxHits} from '~/dotapp/middlewares';

export default {
    "GET /posts/manage": {
        handler: "PostsController.index",
        middleware: setMaxHits("100:60000")
    }
}
```

You are can give a handler function that fires on limit exceeded.

``` javascript
// routes/index.js

import {setMaxHits} from '~/dotapp/middlewares';

export default {
    "GET /posts/manage": {
        handler: "PostsController.index",
        middleware: setMaxHits("100:60000", (req, res) => {
            return res.error("You have consumed your rate limit", 429);
        })
    }
}
```

## Custom Middlewares

You can write you own middleware in the `middleware` directory and use it easily with route.

As example we want to deny users where first name equal 'john'.

``` javascript
// middlewares/restrictName.js

export default (first_name) => {

    return (req, res, next) => {

        if(req.getUser("first_name") === first_name){
            return res.forbidden();
        }

        return next();
    }
}
```
Then Add it to your route.
``` javascript
// routes/index.js

import restrictName from '~/middlewares/restrictName';

export default {
    "GET /posts/manage": {
        handler: "PostsController.index",
        middleware: restrictName("john")
    }
}
```


