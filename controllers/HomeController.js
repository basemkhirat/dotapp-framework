import Controller from './Controller';

import Config from '~/services/config';
import fs from "fs-extra";

import Storage from '~/services/storage';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {


        // Storage.disk("s3").exists("snew.txt", (error, data) => {
        //     if(error) return res.serverError(error);
        //
        //     return res.ok(data);
        // })

        // fs.createReadStream(filePath)

       // return res.ok(Storage.disk("s3").url("file.png"));

        // Storage.disk("s3").save("snew.txt", "hi amazon", function (error, data) {
        //
        //     if(error) return res.serverError(error);
        //
        //     return res.ok(data);
        // });
        //


        return res.ok("Hi " + req.ipAddress());
    }
};
