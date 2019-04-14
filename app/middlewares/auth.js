export default function () {

    return function (req, res, next) {

        if (!req.user) {
            return res.forbidden();
        }

        return next();
    };

}
