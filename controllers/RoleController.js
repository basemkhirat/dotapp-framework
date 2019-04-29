import Controller from "~/controllers/Controller";
import Role from '~/models/role';

export default class extends Controller {

    /**
     * Find one role
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("role.view")) return res.forbidden();

        let id = req.param("id");

        Role.findById(id, function (error, role) {
            if (error) return res.serverError(error);
            if (!role) return res.notFound("Role not found");

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

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.exec((error, roles) => {
            if (error) return res.serverError(error);
            return res.ok(res.attachPolicies(roles, "role"));
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

        role.save(function (error, role) {
            if (error) return res.serverError(error);
            return res.ok(role.id);
        });
    }

    /**
     * Update role by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Role.findById(id, function (error, role) {

            if (error) return res.serverError(error);
            if (!req.can("role.update", role)) return res.forbidden();
            if (!role) return res.notFound("Role not found");

            role.name = req.param("name", role.name);
            role.permissions = req.param("permissions", role.permissions);

            role.save(function (error, role) {
                if (error) return res.serverError(error);
                return res.ok(id);
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

        Role.findById(id, function (error, role) {

            if (error) return res.serverError(error);
            if (!req.can("role.delete", role)) return res.forbidden();
            if (!role) return res.notFound("Role not found");

            role.remove(error => {
                if (error) res.serverError(error);
                return res.ok(id);
            });
        });
    }
};

