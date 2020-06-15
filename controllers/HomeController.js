import Controller from "dotapp/controller";

export default class extends Controller {
    /**
     * Say Hello
     * @param req
     * @param res
     */
    async index(req, res) {
        return res.render("hello");
    }
}
