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
        req.hasPermission = Auth.hasPermission.bind({req});
        req.getUser = Auth.getUser.bind({req});
        req.getRole = Auth.getRole.bind({req});
        req.hasRole = Auth.hasRole.bind({req});

        if (req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                req.token = parts[1];
            }
        }

        if (req.token) {

            jwt.verify(req.token, _config('jwt.secret'), (error, user) => {

                if (!error && user) {

                    User.findById(user._id, {} ,{ autopopulate: false })
                        .where("status", 1)
                        .populate('role', '+permissions', {status: 1})
                        .exec((error, user) => {
                            if (error) return next(error);

                            console.log(user);
                            if (user) {
                                req.permissions = user.role ? user.role.permissions : [];
                                req.user = user;
                                req.role = user.role ? user.role.name : false;
                                req.getUser = Auth.getUser.bind({req});
                                req.getRole = Auth.getRole.bind({req});
                                req.hasRole = Auth.hasRole.bind({req});
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
