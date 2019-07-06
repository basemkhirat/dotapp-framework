import Validator from 'validatorjs';

/**
 * validate new user password of reset password form
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {
    return new Validator(req.all(), {
        password: 'required|min:7'
    });
}
