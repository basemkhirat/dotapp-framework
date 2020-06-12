# Validation Service

A service provides an easy way to validate inputs. It was built on the `validatorjs` package.

## Usage

You can use this service using this way.

``` javascript

import {Validator} from "dotapp/services";

let validation = new Validator(req.all(), {
    first_name: "required|min:2",
    last_name: "required|min:2",
    password: "required|min:7",
});

if (!(await validation.validate())) {
    return res.validationError(validation.errors.all());
}

```

You can register an rule

``` javascript

import {Validator} from "dotapp/services";
import User from '~/models/user';


Validator.registerAsync(
    "email_available",
    async (email, id, x, passes) => {
        let user = await User.where("email", email).findOne();
        return user
            ? passes(false, req.lang("user.email_taken"))
            : passes();
    }
);

let validation = new Validator(req.all(), {
    email: "required|email|email_available"
});

if (!(await validation.validate())) {
    return res.validationError(validation.errors.all());
}

```

Reference: https://github.com/skaterdav85/validatorjs
