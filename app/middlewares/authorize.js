export default function (permissions) {

    return function (req, res, next) {

        if (!req.can(permissions)) {
            return res.forbidden();
        }

        return next();
    };

}
