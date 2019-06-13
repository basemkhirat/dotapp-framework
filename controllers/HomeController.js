import Controller from './Controller';

import User from "~/models/user";

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {
        User.findOne(function (error, user) {
            return res.ok(user.hasRole("superdadmin"));
        });
    }
};
