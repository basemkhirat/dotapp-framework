import User from '~/models/user';

export default function (req) {
    req.check('email', "Email is required").notEmpty();
    req.check('password', "Password is required").notEmpty();
    req.check('first_name', "First name is required").notEmpty();
    req.check('email', "Email is already taken").custom(email => {
        return new Promise((resolve, reject) => {
            User.findOne({email: email, _id: { $ne: req.param("id") }}).exec((error, user) => {
                return user ? reject() : resolve();
            });
        });
    })

}
