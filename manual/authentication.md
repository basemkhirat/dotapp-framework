# Authentication

Flexible module provides an easy way to authenticate users.

DotApp is comming with a basic JWT authentication. You can use the `api/auth/token` endpoint to generate a token.

The generated token should be sent to any protected endpoints using the `authorization` header.

``` javascript
{
    AUTHORIZATION: "Bearer <token>"
}
```

## Configuration

`config/jwt.js` is the configuration file where you can change the secret key and token expiration time.


``` javascript
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

    expires: process.env.TOKEN_EXPIRES || 604800
};

```

Then, you can now check if user using the request object.


### `req.getUser(<field>)`

return current logged user.

@return boolean


``` javascript
// controllers/HomeController.js

import Controller from 'dotapp/controller';

export default class extends Controller {
    index(req, res) {

        const user = req.getUser(); // return the full user object
        const email = req.getUser("email"); // return only the email address

    }
}
```

### `req.getRole(<field>)`

return current logged user role.

@return boolean


``` javascript
// controllers/HomeController.js

import Controller from 'dotapp/controller';

export default class extends Controller {
    index(req, res) {

        const user = req.getRole(); // return the full role object
        const role_name = req.getRole("name"); // return only the role_name

    }
}
```

### `req.hasRole(<role>)`

Check if the current user have a specific role.

@return boolean


``` javascript
// controllers/HomeController.js

import Controller from 'dotapp/controller';

export default class extends Controller {
    index(req, res) {

        if(req.hasRole("editor")){
            return res.ok("I have the editor role");
        }

    }
}
```





