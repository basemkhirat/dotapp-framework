import Controller from "dotapp/controller";
import {Storage} from 'dotapp/services';

export default class extends Controller {
    /**
     * Show Hello
     * @param req
     * @param res
     */
    async index(req, res) {

        try {

            await Storage.disk("publics").save("ss.json", "hhhhhh");

            return res.ok("Hello World");

        }catch(error ){
            return res.serverError();
        }
    }
}
