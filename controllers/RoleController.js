import Controller from "dotapp/controller";
import Role from "~/models/role";
import {Validator} from 'dotapp/services';

export default class extends Controller {
    /**
     * Find one role
     * @param req
     * @param res
     */
    async findOne(req, res) {
        try {
            if (!req.can("role.view")) return res.forbidden();

            let query = Role.findOne();

            query.where("_id", req.param("id"));

            query.where("name").ne("superadmin");

            let role = await query.exec();

            if (!role) {
                return res.notFound(req.lang("role.errors.role_not_found"));
            }

            return res.ok(role);
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Find all roles
     * @param req
     * @param res
     */
    async find(req, res) {
        try {
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

            query.order(
                req.param("sort_field", "created_at"),
                req.param("sort_type", "desc")
            );

            let roles = await query.execWithCount();

            return res.ok({
                total: roles.total,
                docs: roles.docs,
            });
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Create a new role
     * @param req
     * @param res
     * @returns {*}
     */
    async create(req, res) {
        try {
            if (!req.can("role.create")) return res.forbidden();

            Validator.registerAsync(
                "role_name_available",
                async (name, id, x, passes) => {

                    let query = Role.findOne();

                    if(id) {
                        query.where("_id").ne(id);
                    }

                    query.where("name", name);

                    let role = await query.exec();

                    return role
                        ? passes(false, req.lang("role.errors.role_taken"))
                        : passes();
                }
            );

            let validation = Validator.make(req.all(), {
                name: "required|role_name_available"
            });

            if (await validation.failsAsync()) {
                return res.validationError(validation.errors.all());
            }

            let role = new Role();

            role.name = req.param("name", role.name);
            role.permissions = req.param("permissions", role.permissions);
            role.status = req.param("status", role.status);

            await role.save();

            return res.ok(role.id, req.lang("role.events.created"));
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Update role by id
     * @param req
     * @param res
     */
    async update(req, res) {
        try {
            let id = req.param("id");

            Validator.registerAsync(
                "role_name_available",
                async (name, id, x, passes) => {

                    let query = Role.findOne();

                    if(id) {
                        query.where("_id").ne(id);
                    }

                    query.where("name", name);

                    let role = await query.exec();

                    return role
                        ? passes(false, req.lang("role.errors.role_taken"))
                        : passes();
                }
            );

            let validation = Validator.make(req.all(), {
                name: "required|role_name_available:" + id
            });

            if (await validation.failsAsync()) {
                return res.validationError(validation.errors.all());
            }

            let role = await Role.findById(id);

            if (!role) {
                return res.notFound(req.lang("role.errors.role_not_found"));
            }

            if (!req.can("role.update", role)) {
                return res.forbidden(
                    req.lang("role.errors.update_denied", {
                        role: role.name,
                    })
                );
            }

            role.name = req.param("name", role.name);
            role.permissions = req.param("permissions", role.permissions);
            role.status = req.param("status", role.status);

            await role.save();

            return res.ok(id, req.lang("role.events.updated"));
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Delete role by id
     * @param req
     * @param res
     */
    async destroy(req, res) {
        try {
            let id = req.param("id");

            let role = await Role.findById(id);

            if (!role) {
                return res.notFound(req.lang("role.errors.role_not_found"));
            }

            if (!req.can("role.delete", role)) {
                return res.forbidden(
                    req.lang("role.errors.delete_denied", {
                        role: role.name,
                    })
                );
            }

            await role.remove();

            return res.ok(id, req.lang("role.events.deleted"));
        } catch (error) {
            return res.serverError(error);
        }
    }
}
