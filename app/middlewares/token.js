import jwt from "jsonwebtoken";

export default function (req, res, next) {

    let token = req.param("token");

    if (token) {

        jwt.verify(token, _config('jwt.secret'), (error, token) => {

            if (!error && token) {
                req.user = token;
            }

            next();
        });

    } else {
        return next();
    }
}
