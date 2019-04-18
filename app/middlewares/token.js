import jwt from "jsonwebtoken";
import merge from 'merge-deep';
import Auth from '~/services/auth';
import User from '~/models/user';
import custom_policies from '~/policies';

export default function () {

    return function (req, res, next) {

        req.role = false;
        req.token = false;
        req.user = false;
        req.permissions = [];
        req.policies = {};
        req.can = Auth.can.bind({req});
        req.has = Auth.has.bind({req});

        // parse token from request headers

        if (req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                req.token = parts[1];
            }
        }

        if (req.token) {

            jwt.verify(req.token, _config('jwt.secret'), (error, user) => {

                if (!error && user) {

                    User.findById(user._id).populate('role').exec((error, user) => {

                        if (error) return next(error);

                        if (user) {
                            let direct_permissions = user.permissions;
                            let role_permissions = user.role ? user.role.permissions : [];
                            req.permissions = role_permissions.concat(direct_permissions);
                            req.user = user;
                            req.role = user.role ? user.role.name : false;
                        }

                        let policies = {};

                        req.permissions.forEach(permission => {

                            let [module, action] = permission.split(".");

                            if (!(module in policies)) {
                                policies[module] = {};
                                policies[module][action] = true;
                            } else {
                                policies[module][action] = true;
                            }
                        });

                        req.policies = merge(true, policies, custom_policies);
                        next();
                    });

                } else {
                    next();
                }
            });

        } else {
            next();
        }
    }

}
