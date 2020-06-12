import Controller from "dotapp/controller";

export default class extends Controller {
    /**
     * Show Hello
     * @param req
     * @param res
     */
    async index(req, res) {




            res.message("Book not found").notFound();


    }
}

