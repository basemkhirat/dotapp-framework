import Controller from "~/controllers/Controller";
import Role from '~/models/role';

export default class extends Controller {

    /**
     * Find one role
     * @param req
     * @param res
     */
    findOne(req, res) {

        var id = req.param("id");

        Role.findById(id, function (error, role) {
            if (error) return res.serverError(error);
            if (!role) return res.notFound("Role not found");

            return res.ok(role);
        });

    }

    /**
     * Find all roles
     * @param req
     * @param res
     */
    find(req, res) {

        Role.find(function (error, roles) {
            if (error) return res.serverError(error);
            return res.ok(roles);
        });

    }

    /**
     * Create a new role
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

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
            if (!role) return res.notFound("Role not found");

            if (req.param("name")) {
                role.name = req.param("name");
            }

            role.save(function (error, user) {
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
            if (!role) return res.notFound("Role not found");

            Role.remove(function (error, role) {
                if (error) res.serverError(error);

                return res.ok(role);
            });
        });
    }
};

