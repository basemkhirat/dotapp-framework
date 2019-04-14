import jwt from "jsonwebtoken";
import Auth from '~/services/auth';

export default function () {

    return function (req, res, next) {

        req.user = false;
        req.token = false;
        req.can = Auth.can.bind({req});

        // Parse token from request headers

        if (req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                req.token = parts[1];
            }
        }

        if (req.token) {

            jwt.verify(req.token, _config('jwt.secret'), (error, user) => {

                if (!error && user) {

                    Auth.user(user.id, function (error, user) {
                        req.user = user;
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
