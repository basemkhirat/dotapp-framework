import Controller from './Controller';
import moment from 'moment';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {
        res.ok("online");
    }
};
