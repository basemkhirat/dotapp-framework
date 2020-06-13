# Authorization

Flexible module provides an easy way to authorize permissons of users.

## Configuration

`config/permission.js` is the configuration file where you can add and update all application permissions.

In this file we can define every module `book` as example and it's actions [`view`, `create`, `edit` ...etc].

``` javascript
// config/permissions.js

export default {
    book: {
        view,
        create,
        update,
        delete
    },

    // other modules goes here.
}
```

Then, you can now check if user permissions using the request object.

### `req.hasPermission(<permission>)`

Check if the current user have a specific permission.

@return boolean


``` javascript
// controllers/HomeController.js

import Controller from 'dotapp/controller';

export default class extends Controller {
    index(req, res) {

        if(req.hasPermission("book.view")){
            return res.ok("I have access to view book store");
        }

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





