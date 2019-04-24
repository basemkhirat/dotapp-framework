export default function (permissions, ...params) {

    return function (req, res, next) {

        if (!req.can(permissions, ...params)) {
            return res.forbidden("Access Denied", 403);
        }

        return next();
    };

}
