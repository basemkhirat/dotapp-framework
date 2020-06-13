# Middlewares

Middleware is a layer to provide some authentication and authorization before the controller layer.

In `middlewares` directory, create a file exports a function that returns the `express` middleware function.

As example we want to retrict user to specific permission `posts_manage`.


``` javascript

// permission.js
export default (permission) => {

      return function (req, res, next) {

        if (req.can(permission)) {
            return res.forbidden();
        }

        return next();
    };
}
```

Middleware is now created but is not loaded yet.

You can load middleware globally or in specific route.

## Global Middleware

Update `app.js` to use the middleware

``` javascript

import App from 'dotapp';
import permission from '~/middlewares/permission';

const app = App();

// Here we can load a global middleware.
// It will be loaded before incoming routes
app.use(permission("posts_manage"));

app.use("/", function(req, res) {
    return res.ok("Hello. I can manage posts");
});

app.use(app.errorHandler());

export default app;

```

## Route Middleware

Update `routes/index.js` to use the middleware in a specfic route.

``` javascript

import permission from '~/middlewares/permission';

export default {
    "GET /posts": {
        handler: "PostsController.index",
        middleware: permission("posts_manage")
    }
}
```
