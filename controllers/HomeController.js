import Controller from './Controller';
import Resource from '~/services/media';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {

        let payload = req.param("payload");

        Resource.upload(payload, function (error, resource) {
            if(error) return res.serverError(error);

            res.ok(resource);
        });

        //res.ok("Hi " + req.ipAddress());
    }



};
