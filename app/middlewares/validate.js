import fs from "fs";
import path from "path";

export default function (resource) {

    return function (req, res, next) {

        let resource_validator = path.join(process.cwd(), "app/validators/" + resource + ".js");

        if (fs.existsSync(resource_validator)) {

            require(resource_validator).default(req);

            req.getValidationResult().then(errors => {
                let errors_array = errors.array();
                if (errors_array.length) {
                    return res.forbidden(errors_array.map(error => {
                        return error.msg;
                    }), 422);
                } else {
                    return next();
                }
            });
        }else{
            return res.serverError( resource + " validator is not exist");
        }
    }
}
