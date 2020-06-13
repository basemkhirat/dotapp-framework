# Validation Service

A service provides an easy way to validate inputs. It was built on the `validatorjs` package.

## Usage

You can use this service using this way.

``` javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";
import {Validator} from "dotapp/services";

export default class extends Controller {
    async index(req, res) {
        let validation = new Validator(req.all(), {
            first_name: "required|min:2",
            last_name: "required|min:2",
            password: "required|min:7",
        });

        if (validation.fails()) {
            return res.validationError(validation.errors.all());
        }
        
        return res.ok("All inputs valid");
    }
}
```

You can register a new validation rule.

``` javascript
// controllers/HomeController.js

import Controller from "dotapp/controller";
import {Validator} from "dotapp/services";
import User from '~/models/user';

export default class extends Controller {
    async index(req, res) {
    
        Validator.registerAsync(
            "email_available",
            async (email, attribute, req, passes) => {
                let user = await User.where("email", email).findOne();
                return user
                    ? passes(false, req.lang("user.email_taken"))
                    : passes();
            }
        );

        let validation = new Validator(req.all(), {
            email: "required|email|email_available"
        });

        // you must the .validate() method as we add Async operation
        // validate() method return a promise that resolve a boolean value
        
        if (!(await validation.validate())) {
            return res.validationError(validation.errors.all());
        }
        
        return res.ok("All inputs valid");

```
---
Reference: https://github.com/skaterdav85/validatorjs
