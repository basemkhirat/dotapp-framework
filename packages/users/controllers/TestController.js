import Controller from "~/controllers/Controller";

export default class extends Controller {

    index(req, res) {
        console.log("fired");
        return res.ok("adasfad");
    }

}
