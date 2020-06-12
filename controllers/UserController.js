import Controller from "dotapp/controller";
import User from '~/models/user';
import Role from '~/models/role';
import async from 'async';
import moment from 'moment';

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
                query.where({$text: {$search: req.param("q")}});
            }

            query.populate("role").populate("photo");

            query.page(req.param("page"), req.param("limit"));

            query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

            let result = await query.execWithCount();

            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "user")
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
     * Build a chart
     * @param req
     * @param res
     * @returns {*}
     */
    chart(req, res) {

        let duration = req.param("duration", 10);
        let period = req.param("period", "days");
        let start = req.param("start", moment().subtract(duration, period).format());
        let end = req.param("end", moment().format());

        let moment_start = moment(start);
        let moment_end = moment(end);

        let lists = [];
        let started = moment_start;

        while (true) {

            started = started.add(1, period);

            if (started <= moment_end) {
                lists.push(started.locale("en").format());
            } else {
                break;
            }
        }

        return async.map(lists, (date, callback) => {

            let query = User.find();

            query.where({
                created_at: {
                    '$gte': moment(date).locale("en").startOf(period).format(),
                    '$lte': moment(date).locale("en").endOf(period).toDate()
                }
            });

            query.countDocuments((error, total) => {
                if (error) return callback(error);

                callback(null, {
                    date: moment(date).locale("en").startOf(period).format(),
                    total: total
                })
            });


        }, (error, result = []) => {
            return res.ok(result);
        });

    }

    /**
     * Create a new user
     * @param req
     * @param res
     * @returns {*}
     */
    async create(req, res) {

        try {

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
                user.email_verification_code = Math.random().toString(36).slice(-8);
                user.email_verification_code_expiration = Date.now() + 3600000;
            }

            let saved = await user.save();

            if (saved) {

                if (!req.user) {
                    req.mail(user, "VerifyEmail");
                }

                return res.message(req.lang("user.events.created")).ok(user.id);
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

            let user = await User.findById(id);

            if (!user) {
                return res.notFound(req.lang("user.errors.user_not_found"));
            }

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
            user.photo_payload = req.param("photo_payload");

            if (req.filled("password")) {
                user.password = req.param("password");
            }

            let saved = await user.save();

            if (saved) {
                return res.message(req.lang("user.events.updated")).ok(id);
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
                return res.forbidden(req.lang("user.errors.delete_denied", {
                    "user": user.first_name
                }));
            }

            let removed = await user.remove();

            if (removed) {
                return res.message(req.lang("user.events.deleted")).ok(id);
            }

        } catch (e) {
            return res.serverError(error);
        }
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
