import Controller from "dotapp/controller";

export default class extends Controller {
    /**
     * Say Hello
     * @param req
     * @param res
     */
    index(req, res) {
        return res.ok(req.lang("app.name"));
    }
}
