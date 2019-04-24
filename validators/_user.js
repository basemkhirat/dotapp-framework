import User from '~/models/user';

export default function (req) {

    let creating = !req.filled("id");

    if (creating || req.has("email")) {
        req.check('email', "Email is required").notEmpty();
    }

    if (creating || req.has("password")) {
        req.check('password', "Password is required").notEmpty();
    }

    if (creating || req.has("first_name")) {
        req.check('first_name', "First name is required")
            .notEmpty();
    }

    if (creating || req.has("role")) {
        req.check('role', "Role is required").notEmpty();
    }

    if (creating || req.has("email")) {
        req.check('email', "Email is already taken").custom(email => {
            return new Promise((resolve, reject) => {
                User.findOne({email: email, _id: {$ne: req.param("id")}}).exec((error, user) => {
                    return user ? reject() : resolve();
                });
            });
        });
    }

}
