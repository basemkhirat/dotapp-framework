import Controller from "dotapp/controller";
import User from "~/models/user";
import Role from "~/models/role";
import { Validator } from "dotapp/services";

export default class extends Controller {
    /**
     * Find all users
     * @param req
     * @param res
     */
    async find(req, res) {
        try {
            if (!req.can("user.view")) return res.forbidden();

            let superadmin = await Role.where("name", "superadmin").findOne();

            let query = User.find();

            query.where("role").ne(superadmin.id);

            if (req.filled("status")) {
                query.where("status", req.param("status"));
            }

            if (req.filled("lang")) {
                query.where("lang", req.param("lang"));
            }

            if (req.filled("role")) {
                query.where("role", req.param("role"));
            }

            if (req.filled("q")) {
                query.where({ $text: { $search: req.param("q") } });
            }

            query.populate("role").populate("photo");

            query.page(req.param("page"), req.param("limit"));

            query.order(
                req.param("sort_field", "created_at"),
                req.param("sort_type", "desc")
            );

            let result = await query.execWithCount();

            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "user"),
            });
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Find one user
     * @param req
     * @param res
     */
    async findOne(req, res) {
        try {
            if (!req.can("user.view")) return res.forbidden();

            let id = req.param("id");

            let user = await User.findById(id).populate("photo");

            if (!user) {
                return res.notFound(req.lang("user.errors.user_not_found"));
            } else {
                return res.ok(res.attachPolicies(user, "user"));
            }
        } catch (e) {
            return res.serverError(e);
        }
    }

    /**
     * Create a new user
     * @param req
     * @param res
     * @returns {*}
     */
    async create(req, res) {
        try {
            Validator.registerAsync(
                "email_available",
                async (email, id, x, passes) => {
                    let query = User.findOne();

                    if (id) {
                        query.where("_id").ne(id);
                    }

                    query.where("email", email);

                    let user = await query.exec();

                    return user
                        ? passes(false, req.lang("user.email_taken"))
                        : passes();
                }
            );

            let validation = Validator.make(req.all(), {
                first_name: "required|min:2",
                last_name: "required|min:2",
                email: "required|email|email_available",
                password: "required|min:7",
            });

            if (await validation.failsAsync()) {
                return res.validationError(validation.errors.all());
            }

            if (req.filled("status") && !req.can("user.status")) {
                return res.forbidden();
            }

            if (req.filled("role") && !req.can("user.role")) {
                return res.forbidden();
            }

            let user = new User();

            user.email = req.param("email", user.email);
            user.password = req.param("password", user.password);
            user.first_name = req.param("first_name", user.first_name);
            user.last_name = req.param("last_name", user.last_name);
            user.lang = req.param("lang", req.language);
            user.photo = req.param("photo", user.photo);
            user.role = req.param("role", user.role);
            user.status = req.param("status", user.status);
            user.photo_payload = req.param("photo_payload");

            if (!req.user) {
                user.email_verification_code = Math.random()
                    .toString(36)
                    .slice(-8);
                user.email_verification_code_expiration = Date.now() + 3600000;
            }

            let saved = await user.save();

            if (saved) {
                if (!req.user) {
                    req.mail(user, "VerifyEmail");
                }

                return res.ok(user.id, req.lang("user.events.created"));
            }
        } catch (e) {
            return res.serverError(e);
        }
    }

    /**
     * Update user by id
     * @param req
     * @param res
     */
    async update(req, res) {
        try {
            let id = req.param("id");

            Validator.registerAsync(
                "email_available",
                async (email, id, x, passes) => {
                    let query = User.findOne();

                    if (id) {
                        query.where("_id").ne(id);
                    }

                    query.where("email", email);

                    let user = await query.exec();

                    return user
                        ? passes(false, req.lang("user.email_taken"))
                        : passes();
                }
            );

            let validation = Validator.make(req.all(), {
                first_name: "min:2",
                last_name: "min:2",
                email: "email|email_available",
                password: "min:7",
            });

            if (await validation.failsAsync()) {
                return res.validationError(validation.errors.all());
            }

            let user = await User.findById(id);

            if (!user) {
                return res.notFound(req.lang("user.errors.user_not_found"));
            }

            if (!req.can("user.update", user)) {
                return res.forbidden(
                    req.lang("user.errors.update_denied", {
                        user: user.first_name,
                    })
                );
            }

            if (req.filled("status") && !req.can("user.status", user)) {
                return res.forbidden(
                    req.lang("user.errors.status_denied", {
                        user: user.first_name,
                    })
                );
            }

            if (req.filled("role") && !req.can("user.role", user)) {
                return res.forbidden(
                    req.lang("user.errors.role_denied", {
                        user: user.first_name,
                    })
                );
            }

            user.email = req.param("email", user.email);
            user.first_name = req.param("first_name", user.first_name);
            user.last_name = req.param("last_name", user.last_name);
            user.lang = req.param("lang", user.lang);
            user.photo = req.param("photo", user.photo);
            user.status = req.param("status", user.status);
            user.role = req.param("role", user.role);
            user.photo_payload = req.param("photo_payload");

            if (req.filled("password")) {
                user.password = req.param("password");
            }

            let saved = await user.save();

            if (saved) {
                return res.ok(id, req.lang("user.events.updated"));
            }
        } catch (e) {
            return res.serverError(e);
        }
    }

    /**
     * Delete user by id
     * @param req
     * @param res
     */
    async destroy(req, res) {
        try {
            let id = req.param("id");

            let user = await User.findById(id);

            if (!user) {
                return res.notFound(req.lang("user.errors.user_not_found"));
            }

            if (!req.can("user.delete", user)) {
                return res.forbidden(
                    req.lang("user.errors.delete_denied", {
                        user: user.first_name,
                    })
                );
            }

            await user.remove();

            return res.ok(id, req.lang("user.events.deleted"));
        } catch (e) {
            return res.serverError(error);
        }
    }
}
