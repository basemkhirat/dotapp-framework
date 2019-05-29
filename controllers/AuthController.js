import jwt from 'jsonwebtoken';
import Controller from "~/controllers/Controller";
import User from '~/models/user';
import Config from '~/services/config';

export default class extends Controller {

    /**
     * Request a new api token
     * @param req
     * @param res
     * @returns {*}
     */
    token(req, res) {

        let email = req.param("email");
        let password = String(req.param("password"));

        User.findOne({email: email}, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.validationError(req.lang("auth.email_not_found"));

            user.comparePassword(password, function (error, valid) {

                if (error) return res.serverError(error);
                if (!valid) return res.validationError(req.lang("auth.invalid_password"));

                let response = user.toObject();

                response.token = jwt.sign(
                    user.toJSON(),
                    Config.get("jwt.secret"),
                    {expiresIn: Config.get("jwt.expires")}
                );

                response.token_expiration = Config.get("jwt.expires");

                res.ok(response);
            });
        });
    }

    /**
     * Forget my password
     * @param req
     * @param res
     * @returns {*}
     */
    forget(req, res) {

        let email = req.param("email");

        User.findOne({email: email}, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.validationError(req.lang("auth.email_not_found"));

            user.password_token = Math.random().toString(36).slice(-8);
            user.password_token_expiration = Date.now() + 3600000;

            user.save(function (error) {
                if (error) return res.serverError(error);
                return res.message("token sent to mail").ok("");
            });
        });
    }

    /**
     * Request user by token
     * @param req
     * @param res
     * @returns {*}
     */
    user(req, res) {
        return res.ok(req.user);
    }

};

