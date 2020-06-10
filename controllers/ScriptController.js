import Controller from "~/controllers/Controller";
import Mail from "dotapp/services/mail";

export default class extends Controller {

    async index(req, res) {


        req.view("hello", { name: "basem" }, (error, html) => {
            if(error) return res.serverError(error);

            return res.ok(html);
        });

        // try {

        // req.view("hello", { name: "basem" });

        // let mail = await Mail.send({
        //     to: "basemkhirat@gmail.com basemkhirat",
        //     subject: "Test Subject",
        //     html: html,
        // });

        // return res.ok("sent");


        // }catch(error) {
        //     return res.serverError(error);
        // }
    }
}
