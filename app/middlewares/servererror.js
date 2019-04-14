export default function (error, req, res, next) {
    return res.serverError(error.message);
};
