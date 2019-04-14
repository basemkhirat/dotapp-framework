import jwt from 'jsonwebtoken';
import Controller from "~/controllers/controller";
import User from '~/models/user';

export default class extends Controller {

    /**
     * Request a new api token
     * @param req
     * @param res
     * @returns {*}
     */
    token(req, res) {

        var email = req.param("email");
        var password = req.param("password");

        if (!email || !password) return res.badRequest('Email and password required');

        User.findOne({email: email}, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.badRequest('Invalid email');

            user.comparePassword(password, function (error, valid) {

                if (error) return res.forbidden('Forbidden');
                if (!valid) return res.badRequest('Invalid password');

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
        })
    }

};

