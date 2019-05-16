import Controller from './Controller';
import faker from "faker";

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {
        res.ok({
            email: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            password: faker.internet.password(),
            status: 1,
            lang: "en",
            permissions: ["category.create", "category.delete"]
        });
    }
};
