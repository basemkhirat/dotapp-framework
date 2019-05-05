import Controller from './Controller';
//import Command from '~/services/command';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {
        res.ok("Hi " + req.remote_address());
    }
};
