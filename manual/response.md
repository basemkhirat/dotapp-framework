# Response

DotApp response object is the express response object with adding some methods to simplify code usage.

Assume we have a controller `controllers/HomeController.js` where we can access the response object.

``` javascript
// controllers/HomeController.js

import Controller from 'dotapp/controller';

export default class extends Controller {
    index(req, res) {

       // Here we can access the response parameter and return a response

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

- `res.ok(data)`

    It returns a success response with data key.

    ``` bash
    {
        message: "Success",
        status: 200,
        success: true,
        data: <data>
    }
    ```

- `res.validationError(errors)`

    It returns a validation error response with data key.

    ``` bash
    {
        message: "Validation Error",
        errors: <errors>,
        status: 422,
        success: false
    }
    ```

- `res.notFound(message = "Page Not Found")`

    It returns a 404 error.

    ``` bash
    {
        message: <message>,
        status: 404,
        success: false
    }
    ```

- `res.serverError(message = "Internal Server Error")`

    It returns a server error.

    ``` bash
    {
        message: <message>,
        status: 500,
        success: false
    }
    ```

- `res.notAuthenticated(message = "Not Authenticated")`

    It returns an unauthenticated error.

    ``` bash
    {
        message: <message>,
        status: 401,
        success: false
    }
    ```

- `res.forbidden(message = "Access Denied")`

    It returns an unauthorized error.

    ``` bash
    {
        message: <message>,
        status: 403,
        success: false
    }
    ```


- `res.badRequest(message = "Bad Request")`

    It returns a bad request error.

    ``` bash
    {
        message: <message>,
        status: 400,
        success: false
    }
    ```

- `res.error(message, code = 500)`

    It returns a custom error with a custom status code.

    ``` bash
    {
        message: <message>,
        status: 500,
        success: false
    }
    ```

---

Also you can access other `expressjs` response methods listed in expressjs docs.

http://expressjs.com/en/5x/api.html#res.app
