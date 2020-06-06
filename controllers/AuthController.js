import jwt from "jsonwebtoken";
import Controller from "~/controllers/Controller";
import User from "~/models/user";
import Config from "dotapp/services/config";
import request from "request";

export default class extends Controller {
    /**
     * Request a new api token
     * @param req
     * @param res
     * @returns {*}
     */
    async token(req, res) {
        try {
            let email = req.param("email");
            let password = req.param("password");

            let user = await User.where("email", email).populate("photo").findOne();

            if (!user) {
                return res.validationError([
                    {
                        name: "email",
                        errors: [req.lang("auth.email_not_found")],
                    },
                ]);
            }


            if (user.status !== 1) {
                return res.forbidden();
            }

            let valid = await user.comparePassword(password);

            if (!valid) {
                return res.validationError([
                    {
                        name: "password",
                        errors: [req.lang("auth.invalid_password")],
                    },
                ]);
            }

            let response = user.toObject();

            response.token = jwt.sign(user.toJSON(), Config.get("jwt.secret"), {
                expiresIn: Config.get("jwt.expires"),
            });

            response.token_expiration = Config.get("jwt.expires");

            res.ok(response);
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * login by facebook
     * @param req
     * @param res
     */
    facebook(req, res) {
        let access_token = req.param("access_token");
        let url =
            "https://graph.facebook.com/me?fields=email,name&access_token=" +
            access_token;

        request({ url: url, json: true }, async (error, response, body) => {
            if (response.statusCode === 200) {
                let user = await User.where("provider", "facebook")
                    .where("provider_id", body.id)
                    .findOne();

                if (!user) {
                    let email_exists = await User.where(
                        "email",
                        body.email
                    ).countDocuments();

                    if (!email_exists) {
                        let user = new User();

                        user.email = body.email;
                        user.first_name = body.name;
                        user.last_name = "";
                        user.lang = req.language;
                        user.photo_payload =
                            "https://graph.facebook.com/" +
                            body.id +
                            "/picture";
                        user.status = 1;
                        user.provider = "facebook";
                        user.provider_id = body.id;

                        user = await user.save();
                    }
                }

                let response = user.toObject();

                response.token = jwt.sign(
                    user.toJSON(),
                    Config.get("jwt.secret"),
                    { expiresIn: Config.get("jwt.expires") }
                );

                response.token_expiration = Config.get("jwt.expires");

                return res
                    .message(req.lang("user.events.created"))
                    .ok(response);
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
        // let url =
        //     "https://www.googleapis.com/plus/v1/people/me?personfields=names,image&key=AIzaSyA111zEWbTLDGx8BjWYjPNPuv2CD0fBtVM&access_token=" +
        //     access_token;

        let url =
            "https://www.googleapis.com/oauth2/v3/userinfo?key=AIzaSyA111zEWbTLDGx8BjWYjPNPuv2CD0fBtVM&access_token=" +
            access_token;

        request({ url: url, json: true }, async (error, response, body) => {
            if (error) return res.serverError(error);

            if (response.statusCode === 200) {
                let user = await User.where("provider", "google")
                    .where("provider_id", body.sub)
                    .findOne();

                let member;
                if (!user) {
                    let email_exists = await User.where(
                        "email",
                        body.email
                    ).countDocuments();

                    if (email_exists) {
                        return res.validationError([
                            {
                                name: "email",
                                errors: [req.lang("user.email_taken")],
                            },
                        ]);
                    }

                    try {
                        let new_user = new User();

                        new_user.email = body.email;
                        new_user.first_name = body.given_name;
                        new_user.last_name = body.family_name;
                        new_user.lang = req.locale;
                        new_user.photo = null;
                        new_user.status = 1;
                        new_user.provider = "google";
                        new_user.provider_id = body.sub;

                        user = await new_user.save();
                    } catch (error) {
                        return res.serverError(error);
                    }
                }

                let response = user.toObject();

                response.token = jwt.sign(
                    user.toJSON(),
                    Config.get("jwt.secret"),
                    { expiresIn: Config.get("jwt.expires") }
                );

                response.token_expiration = Config.get("jwt.expires");

                return res
                    .message(req.lang("user.events.created"))
                    .ok(response);
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
    async forget(req, res) {
        let email = req.param("email");
        let password_reset_url = req.param("password_reset_url");

        try {
            let user = await User.where("email", email).findOne();

            if (!user) {
                return res.validationError([
                    {
                        name: "email",
                        errors: [req.lang("auth.email_not_found")],
                    },
                ]);
            }

            user.password_token = Math.random().toString(36).slice(-8);
            user.password_token_expiration = Date.now() + 3600000;
            user.password_reset_url = password_reset_url;

            await user.save();

            await new Promise((resolve, reject) => {
                req.mail(user, "ForgetPassword", (error) => {
                    if (error) return reject(error);
                    resolve(null);
                });
            });

            return res
                .message(req.lang("auth.events.password_reset_code_sent"))
                .ok();

        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Reset password
     * @param req
     * @param res
     * @returns {*}
     */
    async reset(req, res) {
        let code = req.param("code");

        try {
            let user = await User.where("password_token", code)
                .where("password_token_expiration", { $gt: Date.now() })
                .findOne();

            if (!user) {
                return res.validationError([
                    {
                        name: "form",
                        errors: [
                            req.lang("auth.invalid_password_verification_code"),
                        ],
                    },
                ]);
            }

            let isEqual = await user.comparePassword(req.param("password"));

            if (isEqual) {
                return res.validationError([
                    {
                        name: "form",
                        errors: [req.lang("auth.cannot_use_same_password")],
                    },
                ]);
            }

            user.password = req.param("password");

            await user.save();

            req.mail(user, "PasswordChanged");

            return res.message(req.lang("auth.events.password_changed")).ok();

        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Verify email
     * @param req
     * @param res
     * @returns {*}
     */
    verify(req, res) {
        let code = req.param("code");

        User.findOne(
            {
                email_verification_code: code,
                email_verification_code_expiration: { $gt: Date.now() },
            },
            (error, user) => {
                if (error) return res.serverError(error);
                if (!user)
                    return res.validationError(
                        req.lang("auth.invalid_email_verification_code")
                    );

                user.status = 1;

                user.save((error, user) => {
                    if (error) return res.serverError(error);

                    req.mail(user, "EmailVerified");

                    return res
                        .message(req.lang("auth.events.email_verified"))
                        .ok();
                });
            }
        );
    }

    /**
     * Request user by token
     * @param req
     * @param res
     * @returns {*}
     */
    user(req, res) {
        User.findById(req.user.id)
            .populate("photo")
            .exec((error, user) => {
                if (error) return res.serverError(error);
                if (!user)
                    return res.notFound(req.lang("user.errors.user_not_found"));

                user = user.toObject();

                let permissions = Config.get("permissions");

                let myPermissions = [];

                for (let module in permissions) {
                    permissions[module].forEach((action) => {
                        if (req.hasPermission(module + "." + action)) {
                            myPermissions.push(module + "." + action);
                        }
                    });
                }

                user.permissions = myPermissions;

                return res.ok(user);
            });
    }
}
