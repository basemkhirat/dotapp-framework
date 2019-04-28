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

        // Cache.get("users", (error, users) => {
        //
        //     if (error) return res.error(error);
        //
        //     if (users) {
        //
        //         res.ok(users);
        //
        //     } else {
        //
        //         User.find().populate("role").exec((error, users) => {
        //             if (error) return res.error(error);
        //
        //             Cache.set("users", users);
        //
        //             res.ok(users);
        //         })
        //     }
        // });


        // Category.find().exec((error, rows) => {
        //     if(error) return res.error(error);
        //     return res.ok(rows);
        // });

    }
};
