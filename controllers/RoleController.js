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

        Role.find(function (error, roles) {
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

        let role = new Role({
            name: req.param("name")
        });

        role.save(function (error, role) {
            if (error) return res.serverError(error);
            return res.ok(role);
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

            if (req.param("name")) {
                role.name = req.param("name");
            }

            role.save(function (error, role) {
                if (error) return res.serverError(error);
                return res.ok(role);
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
            if (!req.can("role.update", role)) return res.forbidden();
            if (!role) return res.notFound("Role not found");

            Role.remove(function (error, role) {
                if (error) res.serverError(error);

                return res.ok(role);
            });
        });
    }
};

