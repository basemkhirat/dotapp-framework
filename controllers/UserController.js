import Controller from "~/controllers/Controller";
import User from '~/models/user';
import Role from '~/models/role';
import async from 'async';

export default class extends Controller {

    /**
     * Find all users
     * @param req
     * @param res
     */
    async find(req, res) {


        if (!req.can("user.view")) return res.forbidden();

        let query = User.find();

        let superadmin = await Role.where("name", "superadmin").findOne();

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
            query.where({$text: {$search: req.param("q")}});
        }

        query.populate("role").populate("photo");

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "user")
            });
        });
    }

    /**
     * Find one user
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("user.view")) return res.forbidden();

        let id = req.param("id");

        User.findById(id).populate("role").populate("photo").exec((error, user) => {
            if (error) return res.serverError(error);
            if (!user) return res.notFound(req.lang("user.errors.user_not_found"));
            return res.ok(res.attachPolicies(user, "user"));
        });
    }

    /**
     * Create a new user
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {


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
        user.lang = req.param("lang", user.lang);
        user.photo = req.param("photo", user.photo);
        user.role = req.param("role", user.role);
        user.status = req.param("status", user.status);

        if(!req.user){
            user.email_verification_code = Math.random().toString(36).slice(-8);
            user.email_verification_code_expiration = Date.now() + 3600000;
        }

        user.save((error, user) => {
            if (error) return res.serverError(error);

            if(!req.user){
                console.log("emaolll");
                req.mail(user, "VerifyEmail");
            }

            return res.message(req.lang("user.events.created")).ok(user.id);
        });
    }

    /**
     * Update user by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        User.findById(id, (error, user) => {
            if (error) return res.serverError(error);
            if (!user) return res.notFound(req.lang("user.errors.user_not_found"));

            if (!req.can("user.update", user)) {
                return res.forbidden(req.lang("user.errors.update_denied", {user: user.first_name}));
            }

            if (req.filled("status") && !req.can("user.status", user)) {
                return res.forbidden(req.lang("user.errors.status_denied", {user: user.first_name}));
            }

            if (req.filled("role") && !req.can("user.role", user)) {
                return res.forbidden(req.lang("user.errors.role_denied", {user: user.first_name}));
            }

            user.email = req.param("email", user.email);
            user.first_name = req.param("first_name", user.first_name);
            user.last_name = req.param("last_name", user.last_name);
            user.lang = req.param("lang", user.lang);
            user.photo = req.param("photo", user.photo);
            user.status = req.param("status", user.status);
            user.role = req.param("role", user.role);

            if (req.filled("password")) {
                user.password = req.param("password");
            }

            user.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("user.events.updated")).ok(id);
            });
        });
    }

    /**
     * Delete user by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        User.findById(id, (error, user) => {
            if (error) return res.serverError(error);
            if (!user) return res.notFound(req.lang("user.errors.user_not_found"));

            if (!req.can("user.delete", user)) {
                return res.forbidden(req.lang("user.errors.delete_denied", {
                    "user": user.first_name
                }));
            }

            user.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("user.events.deleted")).ok(id);
            });
        });
    }

    /**
     * Bulk operations
     * @param req
     * @param res
     */
    bulk(req, res) {

        let operation = req.param("operation");
        let ids = req.param("ids");
        let data = req.param("data");

        ids = Array.isArray(ids) ? ids : ids.toArray(",");

        if (req.filled("data")) {
            data = typeof data === 'object' ? data : JSON.parse(data);
        }

        if (["delete", "update"].indexOf(operation) <= -1) {
            return res.serverError(req.lang("user.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                User.findById(id, (error, user) => {

                    if (error) return res.serverError(error);
                    if (!user) return res.notFound(req.lang("user.errors.user_not_found"));

                    if (operation === "delete") {

                        if (!req.can("user.delete", user)) {
                            return res.forbidden(req.lang("user.errors.delete_denied", {
                                user: user.first_name
                            }));
                        }

                        user.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    } else if (operation === "update") {

                        if ("status" in data) {

                            if (!req.can("user.status", user)) {
                                return res.forbidden(req.lang("user.errors.status_denied", {
                                    user: user.first_name
                                }));
                            }

                            user.status = data.status || user.status;
                        }

                        if ("role" in data) {

                            if (!req.can("user.role", user)) {
                                return res.forbidden(req.lang("user.errors.role_denied", {
                                    user: user.first_name
                                }));
                            }

                            user.role = data.role || user.role;
                        }

                        user.save(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });
                    }
                });

            },

            (error, result = []) => {

                if (operation === "update") {
                    return res.message(req.lang("user.events.updated")).ok(result);
                }

                if (operation === "delete") {
                    return res.message(req.lang("user.events.deleted")).ok(result);
                }
            }
        );

    }
};
