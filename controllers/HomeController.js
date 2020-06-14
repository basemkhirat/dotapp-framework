import Controller from "dotapp/controller";
import User from '~/models/user';

export default class extends Controller {
    /**
     * Show Hello
     * @param req
     * @param res
     */
    async index(req, res) {

        let user = new User();
        user.email = "soso@gmail.com";
        user.password = "qwerty"

        await user.save();

        return res.render("hello");
    }
}
