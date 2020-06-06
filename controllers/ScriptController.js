import Controller from "~/controllers/Controller";
import User from "~/models/user";

export default class extends Controller {
    async index(req, res) {


        try {
            let user = new User();

            user.first_name = "Basem";
            user.last_name = "Khirat";
            user.email = "basemkhirat@gmail.com";
            user.status = 1;
            user.password = "qwerty";

            await user.save();

            return res.ok(user);
        } catch (error) {
            return res.serverError(error);
        }
    }
}
