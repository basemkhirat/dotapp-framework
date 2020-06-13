# Policies

Policies module is an advanced permission system provides a flexible way of user retriction of application components.

If you are developing an application that have a lot of logical conditions depending of users roles and permissions you should have a look at policies.

Policies are developed on the built-in Authorization module to make some logic to determine if the user `can` perform specific action. this action may be creating, updating or deleting some posts.

```
Assume user called 'john' have the permission 'user.delete' to delete users. Now he can delete any user!

But,

Not all users should can delete them. as example he should not delete himself and also he should not delete users have the same role.

That's why we use policies!
```


## Configuration

`policies/index.js` is the configuration file where you can add and update application policies.

```javascript
// policies/index.js

export default {
    user,
        delete: (req, user_needed_to_delete) {



        }
    },
};
```

Then, you can now check if user permissions using the request object.

### `req.hasPermission(<permission>)`

Check if the current user have a specific permission.

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

### `req.hasRole(<role>)`

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
    }
}
```

### `req.getUser(<field>)`

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

### `req.getRole(<field>)`

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
