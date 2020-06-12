import jwt from "jsonwebtoken";
import Controller from "dotapp/controller";
import User from "~/models/user";
import request from "request";
import { Config, Media, Validator, Mail } from "dotapp/services";

export default class extends Controller {
    /**
     * Request a new api token
     * @param req
     * @param res
     * @returns {*}
     */
    async token(req, res) {
        try {
            const validation = new Validator(req.all(), {
                email: "required|email",
                password: "required",
            });

            if (validation.fails()) {
                return res.validationError(validation.errors.all());
            }

            let email = req.param("email");
            let password = req.param("password");

            let user = await User.where("email", email)
                .populate("photo")
                .findOne();

            if (!user) {
                return res.validationError([
                    {
                        email: [req.lang("auth.email_not_found")],
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
                        password: [req.lang("auth.invalid_password")],
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
     * Register a new user
     * @param req
     * @param res
     * @returns {*}
     */
    async register(req, res) {
        try {
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
                first_name: "required|min:2",
                last_name: "required|min:2",
                email: "required|email|email_available",
                password: "required|min:7",
            });

            if (!(await validation.validate())) {
                return res.validationError(validation.errors.all());
            }

            let user = new User();

            user.email = req.param("email", user.email);
            user.password = req.param("password", user.password);
            user.first_name = req.param("first_name", user.first_name);
            user.last_name = req.param("last_name", user.last_name);
            user.lang = req.param("lang", req.language);
            user.status = 0;
            user.email_verification_code = Math.random().toString(36).slice(-8);
            user.email_verification_code_expiration = Date.now() + 3600000;

            await user.save();

            await Mail.send({
                to: user.email,
                subject: req.lang("auth.email_verification"),
                html: await req.view("mails/verify_email", { user }),
            });

            return res.message(req.lang("user.events.created")).ok(user.id);
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Update user personal information
     * @param req
     * @param res
     * @returns {*}
     */
    async profile(req, res) {
        try {
            let validation = new Validator(req.all(), {
                first_name: "min:2",
                last_name: "min:2",
            });

            if (!(await validation.validate())) {
                return res.validationError(validation.errors.all());
            }

            let user = await User.findById(req.user.id);

            if (!user) {
                return res.notFound(req.lang("user.errors.user_not_found"));
            }

            if (req.filled("photo")) {
                let photo = await Media.upload(req.param("photo"));
                user.photo = photo.id;
            }

            if (req.filled("first_name")) {
                user.first_name = req.param("first_name", user.first_name);
            }

            if (req.filled("last_name")) {
                user.last_name = req.param("last_name", user.last_name);
            }

            if (req.filled("lang")) {
                user.lang = req.param("lang", req.getLocale());
            }

            await user.save();

            return res
                .message(req.lang("auth.events.profile_updated"))
                .ok(user.id);
        } catch (error) {
            if (error instanceof Media.FileTypeException) {
                return res.validationError([
                    { image: [req.lang("auth.invalid_photo_type")] },
                ]);
            }

            if (error instanceof Media.FileSizeException) {
                return res.validationError([
                    { image: [req.lang("auth.invalid_photo_size")] },
                ]);
            }

            return res.serverError(error);
        }
    }

    /**
     * Update user password
     * @param {*} req
     * @param {*} res
     */
    async repassword(req, res) {
        try {
            let validation = new Validator(req.all(), {
                old_password: "required",
                new_password: "required|min:7",
            });

            validation.setAttributeNames({
                old_password: req.lang("auth.old_password"),
                new_password: req.lang("auth.new_password"),
            });

            if (validation.fails()) {
                return res.validationError(validation.errors.all());
            }

            let user = await User.findById(req.user.id);

            if (!user) {
                return res.notFound(req.lang("user.errors.user_not_found"));
            }

            let old_password = req.param("old_password");
            let new_password = req.param("new_password");

            // compare with old password

            let isEqualOldPassword = await user.comparePassword(old_password);

            if (!isEqualOldPassword) {
                return res.validationError([
                    { old_password: [req.lang("auth.invalid_old_password")] },
                ]);
            }

            // compare with new password

            let isEqualNewPassword = await user.comparePassword(new_password);

            if (isEqualNewPassword) {
                return res.validationError([
                    { new_password: [req.lang("auth.same_new_password")] },
                ]);
            }

            user.password = new_password;

            await user.save();

            return res
                .message(req.lang("auth.events.password_changed"))
                .ok(user.id);
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Forgot password
     * @param req
     * @param res
     * @returns {*}
     */
    async forgot(req, res) {
        try {
            const validation = new Validator(req.all(), {
                email: "required|email",
            });

            if (validation.fails()) {
                return res.validationError(validation.errors.all());
            }

            let email = req.param("email");
            let password_reset_url = req.param("password_reset_url");

            let user = await User.where("email", email).findOne();

            if (!user) {
                return res.validationError([
                    {
                        email: [req.lang("auth.email_not_found")],
                    },
                ]);
            }

            user.password_token = Math.random().toString(36).slice(-8);
            user.password_token_expiration = Date.now() + 3600000;
            user.password_reset_url = password_reset_url;

            await user.save();

            await Mail.send({
                to: user.email,
                subject: req.lang("auth.password_reset_verification"),
                html: await req.view("mails/forget_password", { user }),
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
        try {
            const validation = new Validator(req.all(), {
                code: "required",
                password: "required|min:6",
            });

            validation.setAttributeNames({
                code: req.lang("auth.verification_code"),
            });

            if (validation.fails()) {
                return res.validationError(validation.errors.all());
            }

            let code = req.param("code");

            let user = await User.where("password_token", code)
                .where("password_token_expiration", { $gt: Date.now() })
                .findOne();

            if (!user) {
                return res.validationError([
                    {
                        code: [
                            req.lang("auth.invalid_password_verification_code"),
                        ],
                    },
                ]);
            }

            let isEqual = await user.comparePassword(req.param("password"));

            if (isEqual) {
                return res.validationError([
                    {
                        password: [req.lang("auth.cannot_use_same_password")],
                    },
                ]);
            }

            user.password = req.param("password");

            await user.save();

            await Mail.send({
                to: user.email,
                subject: req.lang("auth.password_change"),
                html: await req.view("mails/password_changed", { user }),
            });

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
    async verify(req, res) {
        try {
            const validation = new Validator(req.all(), {
                code: "required",
            });

            validation.setAttributeNames({
                code: req.lang("auth.verification_code"),
            });

            if (validation.fails()) {
                return res.validationError(validation.errors.all());
            }

            let code = req.param("code");

            let user = await User.where("email_verification_code", code)
                .where("email_verification_code_expiration")
                .gt(Date.now())
                .findOne();

            if (!user) {
                return res.validationError([
                    {
                        code: [
                            req.lang("auth.invalid_email_verification_code"),
                        ],
                    },
                ]);
            }

            user.status = 1;

            await user.save();

            await Mail.send({
                to: user.email,
                subject: req.lang("auth.email_verification"),
                html: await req.view("mails/email_verified", { user }),
            });

            return res.message(req.lang("auth.events.email_verified")).ok();
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Request user by token
     * @param req
     * @param res
     * @returns {*}
     */
    async user(req, res) {
        try {
            let user = await User.findById(req.user.id).populate("photo");

            if (!user) {
                return res.notFound(req.lang("user.errors.user_not_found"));
            }

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
}
