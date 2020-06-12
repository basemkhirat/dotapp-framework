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
        message: "SUCCESS",
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

- `res.notFound(error)`

    It returns a 404 error.

    ``` bash
    {
        message: "Page Not Found",
        errors: [
            <error>
        ],
        status: 404,
        success: false
    }
    ```

- `res.serverError(error)`

    It returns a server error.

    ``` bash
    {
        message: "Internal Server Error",
        errors: [
            <error>
        ],
        status: 500,
        success: false
    }
    ```

- `res.notAuthenticated(error)`

    It returns an unauthenticated error.

    ``` bash
    {
        message: "Not Authenticated",
        errors: [
            <error>
        ],
        status: 401,
        success: false
    }
    ```

- `res.forbidden(error)`

    It returns an unauthorized error.

    ``` bash
    {
        message: "Access Denied",
        errors: [
            <error>
        ],
        status: 403,
        success: false
    }
    ```


- `res.badRequest(error)`

    It returns a bad request error.

    ``` bash
    {
        message: "Bad Request",
        errors: [
           <error>
        ],
        status: 400,
        success: false
    }
    ```

- `res.error(error, code = 500)`

    It returns a custom error with a custom status code.

    ``` bash
    {
        errors: [
            <error>
        ],
        status: 500,
        success: false
    }
    ```

## Setting a custom message

you can set a custom message using the `message()` method

``` javascript
res.message("Book not found").notFound();
```

``` bash
{
    message: "Book not found",
    errors: [
        "Book not found"
    ],
    status: 404,
    success: false
}
```

---

Also you can access other `expressjs` response methods listed in expressjs docs.

http://expressjs.com/en/5x/api.html#res.app
