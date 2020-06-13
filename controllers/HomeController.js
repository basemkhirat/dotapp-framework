import Controller from "dotapp/controller";

export default class extends Controller {
    /**
     * Show Hello
     * @param req
     * @param res
     */
    async index(req, res) {

        let user = await req.canAsync("book.view");

        return res.ok(JSON.stringify(user));


    }
}
