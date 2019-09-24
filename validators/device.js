import Device from '~/models/device';
import Validator from 'validatorjs';

/**
 * validate device
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {


    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("name")) {
        rules.name = 'required';
    }

    if (creating || req.has("platform")) {
        rules.platfrom = 'required'
    }

    if (creating || req.has("user")) {
        rules.user = 'required'
    }

    if (creating || req.has("driver")) {
        rules.driver = 'required'
    }

    if (creating || req.has("data")) {
        rules.data = 'required'
    }

    return new Validator(req.all(), rules);
}
