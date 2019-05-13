import Validator from 'validatorjs';

/**
 * validate authentication
 * @param req
 * @returns {Validator}
 */
export default function (req) {
    return new Validator(req.all(), {
        email: 'required|email',
        password: 'required'
    });
}
