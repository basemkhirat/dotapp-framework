export default function (permissions, ...params) {

    return function (req, res, next) {

        if (!req.can(permissions, ...params)) {
            return res.forbidden();
        }

        return next();
    };

}
