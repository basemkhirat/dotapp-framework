import Controller from "~/controllers/Controller";
import User from '~/models/user';

export default class extends Controller {

    /**
     * Find all users
     * @param req
     * @param res
     */
    find(req, res) {

        if (!req.can("user.view")) return res.forbidden();

        let query = User.find();

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

        User.findById(id).populate("role").exec((error, user) => {
            if (error) return res.serverError(error);
            if (!user) return res.notFound("User not found");
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

        if (!req.can("user.create")) return res.forbidden();

        let user = new User();

        user.email = req.param("email", user.email);
        user.password = req.param("password", user.password);
        user.first_name = req.param("first_name", user.first_name);
        user.last_name = req.param("last_name", user.last_name);
        user.role = req.param("role", user.role);
        user.status = req.param("status", user.status);
        user.lang = req.param("lang", user.lang);
        user.photo = req.param("photo", user.photo);
        user.permissions = req.param("permissions", user.permissions);

        user.save((error, user) => {
            if (error) return res.serverError(error);
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
            if (!req.can("user.update", user)) return res.forbidden();
            if (!user) return res.notFound("User not found");

            if(req.user.id === user.id && user.status !== req.param("status")) {
                return res.forbidden("Unable to change your status");
            }

            user.email = req.param("email", user.email);
            user.first_name = req.param("first_name", user.first_name);
            user.last_name = req.param("last_name", user.last_name);
            user.status = req.param("status", user.status);
            user.lang = req.param("lang", user.lang);
            user.photo = req.param("photo", user.photo);
            user.role = req.param("role", user.role);
            user.permissions = req.param("permissions", user.permissions);

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

        User.findById(id, function (error, user) {
            if (error) return res.serverError(error);
            if (!req.can("user.delete", user)) return res.forbidden();
            if (!user) return res.notFound("User not found");

            user.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("user.events.deleted")).ok(id);
            });
        });
    }
};
