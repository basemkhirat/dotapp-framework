import Controller from './Controller';
var moment = require('moment');

import Post from '~/models/post';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {


        return res.ok("Hi");



    }
};
