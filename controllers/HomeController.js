import Controller from "dotapp/controller";
import {Auth} from 'dotapp/services';

export default class extends Controller {
    /**
     * Show Hello
     * @param req
     * @param res
     */
    async index(req, res) {

        try {
            return res.ok(Auth.generateToken({name: "ahmed"}));
        }catch(error) {
            console.log( typeof error.constructor);
            return res.serverError(error);
        }


    ///        return res.render("hello");
    }
}
