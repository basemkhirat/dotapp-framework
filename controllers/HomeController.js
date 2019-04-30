import Controller from './Controller';
import User from '~/models/user';


var mongoose = require('mongoose');


export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {


        res.ok("Hii");



    }
};
