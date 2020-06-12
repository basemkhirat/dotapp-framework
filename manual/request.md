# Request

DotApp request object is the express request object with adding some methods to simplify code usage.

Assume we have a controller `controllers/HomeController.js` where we can access the request object.

``` javascript
// controllers/HomeController.js

import Controller from 'dotapp/controller';

export default class extends Controller {
    index(req, res) {

       // Here we can access the request parameter and get parameter value from url

       let message = req.param("message");
    }
}
```

## Request Methods:

- `req.param(name, default_value = null)`

    @return string

    It search for the name in express `req.params`, `req.body` and `req.query` and return the value.

    If param name doesn't exist, default_value will be returned.

- `req.has("name")`

    @return boolean

    It checks if param name in `req.params`, `req.body` and `req.query` and return `true` if exist and `false` if not.

- `req.filled("name")`

    @return boolean

    It's the same as `req.has("name")` but it checks the value and return `true` if exist and have a non-empty value and `false` if not.

- `req.all()`

    @return object

    It returns an object with all params in `req.params`, `req.body` and `req.query`.


- `req.lang(key, variables = {})`

    @return string

    It returns the value of the a localized key stored in `lang` directory depending on the current app locale.

    `variables` are optional object passed to replace variables in the localized string.

- `req.getLocale()`

    @return string

    It returns the current lang by default `en`

- `req.ipAddress()`

    @return string

    It returns the client IP address.


- `req.view(view_file, payload = {})`

    @return promise

    It returns the HTML of view after rendering

    `payload` is an optional object to pass data to views.


Also you can access other `expressjs` request methods listed in expressjs docs.

http://expressjs.com/en/5x/api.html#req.app
