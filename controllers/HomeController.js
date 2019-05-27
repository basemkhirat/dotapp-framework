import Controller from './Controller';

import Storage from '~/services/storage';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {

        // Storage.disk("s3").exists("new.txt", (error, exist) => {
        //     if(error) return res.serverError(error);
        //
        //     return res.ok(exist);
        // });

        // fs.createReadStream(filePath)

       // return res.ok(Storage.disk("s3").url("file.png"));

        // Storage.disk("s3").save("new.txt", "hi amazon", function (error, data) {
        //
        //     if(error) return res.serverError(error);
        //
        //     return res.ok(data);
        // });


        return res.ok("Hi " + req.ipAddress());
    }
};
