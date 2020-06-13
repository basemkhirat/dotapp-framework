# Authorization

Flexible module provides an easy way to authorize permissons of users.

DotApp provides an advanced permission system provides a flexible way of user retriction of application components.

If you are developing an application that have a lot of logical conditions depending of users roles and permissions you should have a look.

Policies are developed to make some logic to determine if the user `can` perform specific action or not. this action may be creating, updating or deleting some posts.

```
Assume user called 'john' have the permission 'user.delete' to delete users. Now he can delete any user!

But,

Not all users should can delete them. as example he should not delete himself and also he should not delete users have the same role.

That's why we use policies!
```

## Configuration

`policies/index.js` is the configuration file where you can add and update application policies.

In this file we can define every module `book` as example and it's actions [`view`, `create`, `edit` ...etc].

```javascript
// policies/index.js

export default {
    book: {
        // always allow all users to view books

        view: true,

        // creation allowed for users have 'editor' role only.

        create: (req) => {
            if (req.hasRole("editor")) {
                return true;
            }
            return false;
        },

        // Update allowed to users have the 'editor' role
        // and should be the user who created the book

        update: (req, book_user_id) => {
            if (req.hasRole("editor") && req.getUser("id") == book_user_id) {
                return true;
            }
            return false;
        },

        // No users allowed to delete books

        delete: false,
    },
};
```

## Usage

```javascript
//controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    index(req, res) {
        if (req.can("book.view")) {
            console.log("I can view all books");
        }

        if (req.can("book.create")) {
            console.log("I can create books");
        }

        if (req.can("book.update", 10)) {
            console.log(
                "I can update book that have ID=10 as I am the creator"
            );
        }

        if (req.can("book.delete")) {
            console.log("I can delete books");
        }

        return res.ok("done");
    }
}
```

## Authorizing Async operations

```javascript
// policies/index.js

export default {
    book: {
        manage: (req, done) => {
            // some i/o operation
            setTimeout(() => {
                done(true);
            }, 3000);
        },
    },
};
```

```javascript
//controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    index(req, res) {
        req.can("book.manage", (is_allowed) => {
            if (is_allowed) {
                return res.ok("I can manage books");
            } else {
                return res.ok("I can not manage books");
            }
        });
    }
}
```

You can also use `canAsync()` that return a `promise`.

```javascript
//controllers/HomeController.js

import Controller from "dotapp/controller";

export default class extends Controller {
    async index(req, res) {
        let is_allowed = await req.can("book.manage");

        if (is_allowed) {
            return res.ok("I can manage books");
        } else {
            return res.ok("I can not manage books");
        }
    }
}
```

Then, you can now check if user permissions using the request object.

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
