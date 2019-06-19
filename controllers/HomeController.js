import Controller from './Controller';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {

        res.ok("Hi");

    }
};
