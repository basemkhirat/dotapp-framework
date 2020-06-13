# Response

DotApp response object is the express response object with adding more functions.

Assume we have a controller `controllers/HomeController.js` where we can access the response object.

``` javascript
// controllers/HomeController.js

import Controller from 'dotapp/controller';

export default class extends Controller {
    index(req, res) {

       // Here we can access the response object to return a response

       return res.ok("Hello World");
    }
}
```
The result will be:
``` bash
{
    message: "SUCCESS",
    status: 200,
    success: true,
    data: "Hello World"
}
```

## Response Methods:

#### res.ok(data, message = 'Success')

    Return a success response with data key.

``` javascript
{
    message: <message>,
    status: 200,
    success: true,
    data: <data>
}
```

#### res.validationError(errors, message = "Validation Error")

    Return a validation error response with data key.

``` javascript
{
    message: <message>,
    errors: <errors>,
    status: 422,
    success: false
}
```

#### res.notFound(message = "Page Not Found")

    Return a 404 error.

``` javascript
{
    message: <message>,
    status: 404,
    success: false
}
```

#### res.serverError(message = "Internal Server Error")

    Return a server error.

``` javascript
{
    message: <message>,
    status: 500,
    success: false
}
```

#### res.notAuthenticated(message = "Not Authenticated")

    Return an unauthenticated error.

``` javascript
{
    message: <message>,
    status: 401,
    success: false
}
```

#### res.forbidden(message = "Access Denied")

    Return an unauthorized error.

``` javascript
{
    message: <message>,
    status: 403,
    success: false
}
```


#### res.badRequest(message = "Bad Request")

    Return a bad request error.

``` javascript
{
    message: <message>,
    status: 400,
    success: false
}
```

#### res.error(message, code = 500)

    Return a custom error with a custom status code.

``` javascript
{
    message: <message>,
    status: <code>,
    success: false
}
```

---

Also you can access other `expressjs` response methods listed in expressjs docs.

http://expressjs.com/en/5x/api.html#res.app
