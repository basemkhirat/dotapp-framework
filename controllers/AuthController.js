import jwt from 'jsonwebtoken';
import Controller from "~/controllers/Controller";
import User from '~/models/user';
import Config from 'dotapp/services/config';
import request from 'request';

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

        User.findOne({email: email}, (error, user) => {

            if (error) return res.serverError(error);
            if (!user) return res.validationError(req.lang("auth.email_not_found"));

            user.comparePassword(password, (error, valid) => {

                if (error) return res.serverError(error);
                if (!valid) return res.validationError(req.lang("auth.invalid_password"));

                if (user.status !== 1) {
                    return res.forbidden();
                }

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
     * login by facebook
     * @param req
     * @param res
     */
    facebook(req, res) {

        let access_token = req.param("access_token");
        let url = "https://graph.facebook.com/me?fields=email,name&access_token=" + access_token;

        request({url: url, json: true}, async (error, response, body) => {

            if (response.statusCode === 200) {

                let user = await User.where("provider", "facebook")
                    .where("provider_id", body.id)
                    .findOne();

                let email_exists = await User.where("email", body.email).countDocuments();

                if (!user && !email_exists) {

                    let user = new User();

                    user.email = body.email;
                    user.first_name = body.name;
                    user.last_name = "";
                    user.lang = req.language;
                    user.photo_payload = "https://graph.facebook.com/" + body.id + "/picture";
                    user.status = 1;
                    user.provider = "facebook";
                    user.provider_id = body.id;

                    user = await user.save();
                }

                let response = user.toObject();

                response.token = jwt.sign(
                    user.toJSON(),
                    Config.get("jwt.secret"),
                    {expiresIn: Config.get("jwt.expires")}
                );

                response.token_expiration = Config.get("jwt.expires");

                return res.message(req.lang("user.events.created")).ok(response);

            } else {
                return res.serverError(body.error.message);
            }

        });


    }


    /**
     * login by google
     * @param req
     * @param res
     */
    google(req, res) {

        let access_token = req.param("access_token");
        let url = "https://www.googleapis.com/plus/v1/people/me?personfields=names,image&key=AIzaSyD9jk0l10St-qTgHex78671WMKc8m1UcK4&access_token=" + access_token;

        console.log(url);

        request({url: url, json: true}, async (error, response, body) => {

            if (response.statusCode === 200) {

                let user = await User.where("provider", "google")
                    .where("provider_id", body.id)
                    .findOne();

                let email = body.emails[0].value;

                if (!user) {

                    let email_exists = await User.where("email", email).countDocuments();

                    if (email_exists) {
                        return res.validationError(req.lang("user.email_taken"));
                    }

                    let user = new User();

                    user.email = email;
                    user.first_name = email.split("@")[0];
                    user.last_name = "";
                    user.lang = req.language;
                    user.photo_payload = body.image.url;
                    user.status = 1;
                    user.provider = "google";
                    user.provider_id = body.id;

                    user = await user.save();
                }

                let response = user.toObject();

                response.token = jwt.sign(
                    user.toJSON(),
                    Config.get("jwt.secret"),
                    {expiresIn: Config.get("jwt.expires")}
                );

                response.token_expiration = Config.get("jwt.expires");

                return res.message(req.lang("user.events.created")).ok(response);

            } else {
                return res.serverError(body.error.message);
            }

        });
    }

    /**
     * Forget password
     * @param req
     * @param res
     * @returns {*}
     */
    forget(req, res) {

        let email = req.param("email");

        User.findOne({email: email}, (error, user) => {

            if (error) return res.serverError(error);
            if (!user) return res.validationError(req.lang("auth.email_not_found"));

            user.password_token = Math.random().toString(36).slice(-8);
            user.password_token_expiration = Date.now() + 3600000;

            user.save((error, user) => {
                if (error) return res.serverError(error);

                req.mail(user, "ForgetPassword", error => {
                    if (error) throw error;
                });

                return res.message(req.lang("auth.events.password_reset_code_sent")).ok();
            });
        });
    }

    /**
     * Reset password
     * @param req
     * @param res
     * @returns {*}
     */
    reset(req, res) {

        let code = req.param("code");

        User.findOne({password_token: code, password_token_expiration: {$gt: Date.now()}}, (error, user) => {
            if (error) return res.serverError(error);
            if (!user) return res.validationError(req.lang("auth.invalid_password_verification_code"));

            user.comparePassword(req.param("password"), (error, same) => {

                if (error) return res.serverError(error);
                if (same) return res.validationError(req.lang("auth.cannot_use_same_password"));

                user.password = req.param("password");

                user.save((error, user) => {
                    if (error) return res.serverError(error);

                    req.mail(user, "PasswordChanged");

                    return res.message(req.lang("auth.events.password_changed")).ok();
                });
            });
        });
    }

    /**
     * Verify email
     * @param req
     * @param res
     * @returns {*}
     */
    verify(req, res) {

        let code = req.param("code");

        User.findOne({
            email_verification_code: code,
            email_verification_code_expiration: {$gt: Date.now()}
        }, (error, user) => {
            if (error) return res.serverError(error);
            if (!user) return res.validationError(req.lang("auth.invalid_email_verification_code"));

            user.status = 1;

            user.save((error, user) => {
                if (error) return res.serverError(error);

                req.mail(user, "EmailVerified");

                return res.message(req.lang("auth.events.email_verified")).ok();
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

        User.findById(req.user.id).populate("photo").exec((error, user) => {
            if (error) return res.serverError(error);
            if (!user) return res.notFound(req.lang("user.errors.user_not_found"));

            user = user.toObject();

            let permissions = Config.get("permissions");

            let myPermissions = [];

            for (let module in permissions) {
                permissions[module].forEach(action => {
                    if (req.hasPermission(module + "." + action)) {
                        myPermissions.push(module + "." + action);
                    }
                });
            }

            user.permissions = myPermissions;

            return res.ok(user);
        });
    }
};

