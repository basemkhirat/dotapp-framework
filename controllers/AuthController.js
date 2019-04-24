import jwt from 'jsonwebtoken';
import Controller from "~/controllers/controller";
import User from '~/models/user';

export default class extends Controller {

    /**
     * Request a new api token
     * @param req
     * @param res
     * @returns {*}
     */
    token(req, res) {

        let email = req.param("email");
        let password = req.param("password");

        User.findOne({email: email}, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.validationError('Email not found');

            user.comparePassword(password, function (error, valid) {

                if (error) return res.serverError(error);
                if (!valid) return res.validationError('Invalid password');

                let response = user.toObject();

                response.token = jwt.sign(
                    user.toJSON(),
                    _config("jwt.secret"),
                    {expiresIn: _config("jwt.expires")}
                );

                response.token_expiration = _config("jwt.expires");

                res.ok(response);
            });
        })
    }

    /**
     * Get requested user by token
     * @param req
     * @param res
     * @returns {*}
     */
    user(req, res) {
        return res.ok(req.user);
    }

};

