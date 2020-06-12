# Routes

Flexible routes built on express routes to be simplifed.

In `routes/index.js`, you can define your application routes with a javascript object.

You can use an express function in middleware.

``` javascript
export default {
    "GET /": (req, res) => {
        return res.ok("Hello world");
    }
}
```

OR you can pass a controller method directly.

``` javascript
export default {
    "GET /": "PostsController.index",
    "POST /": "PostsController.create",
    "PUT /:id": "PostsController.update",
    "DELETE /:id": "PostsController.delete",

    // optional params
     "GET /:parent?": "PostsController.index",
}
```

## Route Middleware

``` javascript
import permission from '~/middlewares/permission';

export default {
    "GET /posts": {
        handler: "PostsController.index",
        middleware: permission("posts_manage")
    }
}
```


## Route Group

``` javascript
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
