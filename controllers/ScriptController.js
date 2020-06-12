import Controller from "~/controllers/Controller";
import {Cache} from "dotapp/services";

export default class extends Controller {

    async index(req, res) {

     //  Config.set("app.url", "dsfdsfsd");

        //await Cache.set("users", "hi these are users....", "80m");

        setTimeout(async () => {
            await Cache.delete("users")
        }, 7000);

        let users = await Cache.get("users");

  //      console.log(users);

        return res.ok(users);

        // try {

        //     let file = await Media.upload("http://www.lancsngfl.ac.uk/cmsmanual/download/file/Arrow_1R.cur");

        //     return res.ok(file ? "uploaded": "not");

        // }catch(error) {

        //     if(error instanceof Media.FileTypeException){
        //         return res.validationError([
        //             {image: ["invalid file type"]}
        //         ]);
        //     }

        //     if(error instanceof Media.FileSizeException){
        //         return res.validationError([
        //             {image: ["file size exceeded"]}
        //         ]);
        //     }

        //     return res.serverError(error);
        // }
        // // https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3
        // // https://soundcloud.com/alafasy/orvyfzgv7lbt
        // // https://www.youtube.com/watch?v=WP2Qz1p2ZB8



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
