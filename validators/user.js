import User from '~/models/user';
import Validator from 'validatorjs';

/**
 * validate user
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('email_available', function (email, id, x, passes) {

        let query = {email: email};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        User.findOne(query).exec((error, user) => {
            return user ? passes(false, req.lang("user.email_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("email")) {
        rules.email = 'required|email|email_available:' + req.param("id", 0);
    }

    if (creating || req.has("password")) {
        rules.password = 'required|min:7';
    }

    if (creating || req.has("first_name")) {
        rules.first_name = 'required|min:2';
    }

    if (creating || req.has("last_name")) {
        rules.last_name = 'required|min:2';
    }

    if (creating || req.has("status")) {
        rules.status = 'numeric|in:1,0';
    }

    return new Validator(req.all(), rules);
}
