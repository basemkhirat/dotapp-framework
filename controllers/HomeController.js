import Controller from './Controller';

import Storage from '~/services/storage';

import Resource from '~/services/media';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {


        // Storage.disk("s3").save("his.txt", "" (error, data) => {
        //     if(error) return res.serverError(error);
        //     return res.ok(data);
        // });

        // Storage.disk("s3").save("hi.txt", "data .......", (error, data) => {
        //     if(error) return res.serverError(error);
        //     return res.ok(data);
        // });

       // return res.ok(Storage.disk("uploads").path("file.jpg"));

        // Storage.disk("uploads").save("new.txt", "hi", (error, exist) => {
        //     if(error) return res.serverError(error);
        //
        //     return res.ok(exist);
        // });

        // fs.createReadStream(filePath)

       // return res.ok(Storage.disk("s3").url("file.png"));
       //
       //  Storage.disk("uploads").save("new.txt", "hi amazon", function (error, data) {
       //
       //      if(error) return res.serverError(error);
       //
       //      return res.ok(data);
       //  });

        //return res.ok("Hi " + req.ipAddress());
    }
};
