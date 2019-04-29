import Validator from 'validatorjs';

export default function (req) {
    return new Validator(req.all(), {
        email: 'required|email',
        password: 'required'
    });
}
