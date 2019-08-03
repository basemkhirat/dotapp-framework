import Controller from "~/controllers/Controller";
import Role from '~/models/role';
import async from "async";

export default class extends Controller {

    /**
     * Find one role
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("role.view")) return res.forbidden();

        let query = Role.findOne();

        query.where("_id", req.param("id"));

        query.where("name").ne("superadmin");

        query.exec(function (error, role) {
            if (error) return res.serverError(error);
            if (!role) return res.notFound(req.lang("role.errors.role_not_found"));

            return res.ok(res.attachPolicies(role, "role"));
        });
    }

    /**
     * Find all roles
     * @param req
     * @param res
     */
    find(req, res) {

        if (!req.can("role.view")) return res.forbidden();

        let query = Role.find();

        query.where("name").ne("superadmin");

        if (req.filled("q")) {
            query.where("name", new RegExp(req.param("q")));
        }

        if (req.filled("status")) {
            query.where("status", req.param("status"));
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "role")
            });
        });
    }

    /**
     * Create a new role
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("role.create")) return res.forbidden();

        let role = new Role();

        role.name = req.param("name", role.name);
        role.permissions = req.param("permissions", role.permissions);
        role.status = req.param("status", role.status);

        role.save((error, role) => {
            if (error) return res.serverError(error);
            return res.message(req.lang("role.events.created")).ok(role.id);
        });
    }

    /**
     * Update role by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Role.findById(id, (error, role) => {

            if (error) return res.serverError(error);
            if (!role) return res.notFound(req.lang("role.errors.role_not_found"));

            if (!req.can("role.update", role)) {
                return res.forbidden(req.lang("role.errors.update_denied", {
                    role: role.name
                }));
            }

            role.name = req.param("name", role.name);
            role.permissions = req.param("permissions", role.permissions);
            role.status = req.param("status", role.status);

            role.save((error, role) => {
                if (error) return res.serverError(error);
                return res.message(req.lang("role.events.updated")).ok(id);
            });
        });
    }

    /**
     * Delete role by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Role.findById(id, (error, role) => {

            if (error) return res.serverError(error);
            if (!role) return res.notFound(req.lang("role.errors.role_not_found"));

            if (!req.can("role.delete", role)) {
                return res.forbidden(req.lang("role.errors.delete_denied", {
                    role: role.name
                }));
            }

            role.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("role.events.deleted")).ok(id);
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
            return res.serverError(req.lang("role.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                Role.findById(id,  (error, role) => {

                    if (error) return res.serverError(error);
                    if (!role) return res.notFound(req.lang("role.errors.role_not_found"));

                    if (operation === "delete") {

                        if (!req.can("role.delete", role)) {
                            return res.forbidden(req.lang("role.errors.delete_denied", {
                                role: role.name
                            }));
                        }

                        role.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    } else if (operation === "update") {

                        if (!req.can("role.update", role)) {
                            return res.forbidden(req.lang("role.errors.update_denied", {
                                role: role.name
                            }));
                        }

                        if ("status" in data) {
                            role.status = data.status || role.status;
                        }

                        if ("permissions" in data) {
                            role.permissions = data.permissions || role.permissions;
                        }

                        role.save(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });
                    }
                });

            },

            (error, result = []) => {

                if (operation === "update") {
                    return res.message(req.lang("role.events.updated")).ok(result);
                }

                if (operation === "delete") {
                    return res.message(req.lang("role.events.deleted")).ok(result);
                }
            }
        );

    }
};

