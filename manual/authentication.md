# Authentication

Flexible module provides an easy way to authenticate users.

## Life Cycle

Users are saved with an encrypted password in `user` collection. So on user creation, DotApp calls `Auth.generateHash(<raw_password>)` to encrypt the raw password to save the user with encrypted password.

Also when verifing a valid user with email/password, DotApp calls `Auth.comparePasswords(<raw_password>, <encrypted_password>)` which return `true` if they are the same values.

If the two passwords are the same, DotApp uses `Auth.generateToken({id: ****, email: ****, ...})` to generate a token from user data to be stored in the client.

The generated token should be sent with any protected endpoints using the `authorization` header.

```javascript
{
    AUTHORIZATION: "Bearer <token>";
}
```

## Configuration

`config/jwt.js` is the configuration file where you can change the secret key and token expiration time.

```javascript
// config/jwt.js

export default {
    /**
     * is a string, buffer, or object containing either the secret for HMAC algorithms
     * or the PEM encoded private key for RSA and ECDSA.
     * In case of a private key with passphrase an object { key, passphrase }
     * can be used (based on crypto documentation),
     * in this case be sure you pass the algorithm option
     */

    secret: process.env.TOKEN_SECRET || "Q%!$^I4lkj31r$231rkvmmdks231@!$!RFsaf",

    /**
     * expressed in seconds.
     * Eg: 600
     */

    expires: process.env.TOKEN_EXPIRES || 604800,
};
```

## Methods:

#### `Auth.generateHash(<raw_password>, <callback?>)`

    Encrypt the raw password.

    @return promise

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";
import { Auth } from "dotapp/services";

export default class extends Controller {
    async index(req, res) {

        let encrypted_password = await Auth.generateHash("123456789");

        // "$2b$10$TgKO72FmwBOXzqzcKIvIzuOZmaRK5JkvCCwrMiXqdo6d90Vff2m0q
    }
}
```

#### `Auth.comparePasswords(<raw_password>, <encrypted_password>, <callback?>)`

    Check if the raw password and encrypted password are the same.

    @return promise

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";
import { Auth } from "dotapp/services";

export default class extends Controller {
    async index(req, res) {

        let is_same = await Auth.comparePasswords("123456789", "$2b$10$TgKO72FmwBOXzqzcKIvIzuOZmaRK5JkvCCwrMiXqdo6d90Vff2m0q);

        // true
    }
}
```

#### `Auth.generateToken(<user_data>)`

    Generate a token from user data object.

    @return string

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";
import { Auth } from "dotapp/services";

export default class extends Controller {
    async index(req, res) {

        let token = Auth.generateToken({
            id:"5ee60aae993592da01e74a35",
            email: "john.doe@gmail.com",
            first_name: "John",
            last_name: "Doe
        });

        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIiwic3RhdHVzIjoxLCJsYW5nIjoiZW4iLCJwcm92aWRlciI6ImxvY2FsIiwiX2lkIjoiNWVlNjBhYWU5OTM1OTJkYTAxZTc0YTM1IiwiZW1haWwiOiJzb3NvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFRnS083MkZtd0JPWHpxemNLSXZJenVPWm1hUks1Smt2Q0N3ck1pWHFkbzZkOTBWZmYybTBxIiwiY3JlYXRlZF9hdCI6IjIwMjAtMDYtMTRUMTE6MzE6NTguMzcxWiIsInVwZGF0ZWRfYXQiOiIyMDIwLTA2LTE0VDExOjMxOjU4LjM3MVoiLCJuYW1lIjoiICIsImNyZWF0ZWQiOiLZhdmG2LAg2K_ZgtmK2YLYqtmK2YYiLCJ1cGRhdGVkIjoi2YXZhtiwINiv2YLZitmC2KrZitmGIiwiaWQiOiI1ZWU2MGFhZTk5MzU5MmRhMDFlNzRhMzUiLCJpYXQiOjE1OTIxMzQ0MzAsImV4cCI6MTU5MjczOTIzMH0.Wm3ngwFXx8uwYi8xREmu4dY_IBsNN8U6dZASzcKlYWA"
    }
}
```

#### `Auth.getTokenExpiration()`

    Return the token expiration time.

    @return string

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";
import { Auth } from "dotapp/services";

export default class extends Controller {
    async index(req, res) {

        let expiration = Auth.getTokenExpiration();

        // 604800
    }
}
```

## Request Authentication

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

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    index(req, res) {
        const user = req.getRole(); // return the full role object
        const role_name = req.getRole("name"); // return only the role_name
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

#### `req.canAsync(<permission>, <param?>, <done?>)`

    Check if the current user can do specific permission of async policy.

    @return promise

```javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    async index(req, res) {
        const is_allowed = await req.canAsync("book.view");
        return res.ok(is_allowed);
    }
}
```
