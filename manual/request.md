# Request

DotApp request object is the express request object with adding some methods to do more functions.

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

#### `req.param(name, default_value = null)`

    @return string

    Get a param name in express from `req.params`, `req.body` and `req.query` and return the value.

    If param name doesn't exist, default_value will be returned.

#### `req.has("name")`

    @return boolean

   check if param name in `req.params`, `req.body` and `req.query` and return `true` if exist and `false` if not.

#### `req.filled("name")`

    @return boolean

    It's the same as `req.has("name")` but it checks the value and return `true` if exist and have a non-empty value and `false` if not.

#### `req.all()`

    @return object

    Return an object with all params in `req.params`, `req.body` and `req.query`.

#### `req.getLocale()`

    @return string

    Returns the current lang by default `en`
    
#### `req.lang(key, variables = {})`

    @return string

    Returns the value of the a localized key stored in `lang` directory depending on the current app locale.

    `variables` are optional object passed to replace variables in the localized string.

#### `req.ipAddress()`

    @return string

    Returns the client IP address.


#### `req.view(view_file, payload = {})`

    @return promise

    Returns the HTML of view after rendering

    `payload` is an optional object to pass data to views.

#### `req.can(<permission>, <param?>, <done?>)`

    Check if the current user can do specific permission.

    @return boolean

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    index(req, res) {
        if (req.hasPermission("book.view")) {
            return res.ok("I have access to view book store");
        }
    }
}
```

#### `req.hasPermission(<permission>)`

    Check if the current user have a specific permission.

    `hasPermission` checks if permission is assigned to user only using his role

    @return boolean

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    index(req, res) {
        if (req.can("book.view")) {
            return res.ok("I have access to view book store");
        }

        return res.forbidden();
    }
}
```

#### `req.hasRole(<role>)`

    Check if the current user have a specific role.

    @return boolean

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    index(req, res) {
        if (req.hasRole("editor")) {
            return res.ok("I have the editor role");
        }

        return res.forbidden();
    }
}
```

#### `req.getUser(<field>)`

    return current logged user.

    @return boolean

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    index(req, res) {
        const user = req.getUser(); // return the full user object
        const email = req.getUser("email"); // return only the email address
    }
}
```

#### `req.getRole(<field>)`

    return current logged user role.

    @return boolean

``` javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    index(req, res) {
        const user = req.getRole(); // return the full role object
        const role_name = req.getRole("name"); // return only the role_name
    }
}
```


---

Also you can access other `expressjs` request methods listed in expressjs docs.

http://expressjs.com/en/5x/api.html#req.app
