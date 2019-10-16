import Controller from './Controller';
// import {google} from 'googleapis';
import cheerio from 'cheerio';
import request from "request";
import moment from 'moment';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    index(req, res, next) {
        return res.ok("Success")
    }
};
