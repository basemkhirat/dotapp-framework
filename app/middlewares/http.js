import walkSync from 'walk-sync';
import path from 'path';

export default function () {

    return function (req, res, next) {

        let responses_path = path.join(process.cwd(), "app/responses");

        walkSync(responses_path).forEach(file => {

            let response = require(path.join(responses_path, file)).default;

            if (typeof response === "function") {
                res[path.parse(file).name] = response.bind({req, res});
            }
        });

        let requests_path = path.join(process.cwd(), "app/requests");

        walkSync(requests_path).forEach(file => {

            let request = require(path.join(requests_path, file)).default;

            if (typeof request === "function") {
                req[path.parse(file).name] = request.bind(req);
            }
        });

        let helpers_path = path.join(process.cwd(), "app/helpers");

        walkSync(helpers_path).forEach(file => {

            let helpers = require(path.join(helpers_path, file));

            for (let helper in helpers) {
                if (typeof helpers[helper] === "function") {
                    global[helper] = helpers[helper].bind({req, res});
                }
            }

        });

        return next();
    }
}
