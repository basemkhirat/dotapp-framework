import Controller from "~/controllers/Controller";
import User from '~/models/user';
import jwt from "jsonwebtoken";

export default class extends Controller {

    /**
     * Find one user
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("user.view")) return res.forbidden();

        let id = req.param("id");

        User.findById(id, function (error, user) {
            if (error) return res.serverError(error);
            if (!user) return res.notFound("User not found");
            return res.ok(res.attachPolicies(user, "user"));
        });

    }

    /**
     * Find all users
     * @param req
     * @param res
     */
    find(req, res) {

        if (!req.can("user.view")) return res.forbidden();

        User.find().populate("role").exec(function (error, users) {
            if (error) return res.serverError(error);
            return res.ok(res.attachPolicies(users, "user"));
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

        let user = new User({
            username: req.param("username"),
            email: req.param("email"),
            password: req.param("password"),
            first_name: req.param("first_name"),
            last_name: req.param("last_name")
        });

        user.save(function (error, user) {
            if (error) return res.serverError(error);
            return res.ok({
                user: user,
                token: jwt.sign(
                    user.toJSON(),
                    _config("jwt.secret"),
                    {expiresIn: _config("jwt.expires")}
                ),
                expires: _config("jwt.expires")
            });
        });
    }

    /**
     * Update user by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        User.findById(id, function (error, user) {
            if (error) return res.serverError(error);
            if (!req.can("user.update", user)) return res.forbidden();
            if (!user) return res.notFound("User not found");

            if (req.param("username")) {
                user.username = req.param("username");
            }

            if (req.param("email")) {
                user.email = req.param("email");
            }

            if (req.param("first_name")) {
                user.first_name = req.param("first_name")
            }

            if (req.param("last_name")) {
                user.last_name = req.param("last_name");
            }

            if (req.param("password")) {
                user.password = req.param("password");
            }

            user.save(function (error, user) {
                if (error) return res.serverError(error);
                return res.ok(user);
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

            user.remove(function (error, user) {
                if (error) res.serverError(error);
                return res.ok(user);
            });
        });
    }
};

