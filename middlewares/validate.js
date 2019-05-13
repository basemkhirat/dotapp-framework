import fs from "fs";
import path from "path";
import Validator from 'validatorjs';

export default function (resource) {

    return function (req, res, next) {

        Validator.useLang(req.getLocale());
        Validator.setMessages(req.getLocale(), require("~/lang/" + req.getLocale() + "/validation"));

        let resource_validator = path.join(process.cwd(), "validators/" + resource + ".js");

        fs.access(resource_validator, error => {
            if (error) return res.serverError(resource + " validator is not exist");

            let validation = require(resource_validator).default(req, res);

            validation.checkAsync(() => {
                return next();
            }, () => {
                return res.validationError(Object.values(validation.errors.all()).map(error => error[0]));
            });
        });
    }
}
