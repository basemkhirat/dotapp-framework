import Controller from './Controller';

import Tag from "~/models/tag";

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {

        Tag.saveNames([], (error, tags) => {
            if(error) return res.serverError(error);
            return res.ok(tags);
        });

    }
};
