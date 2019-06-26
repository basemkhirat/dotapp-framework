
import Controller from './Controller';

import Like from '~/models/like';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    index(req, res, next) {

        Like.get({
            type: "post",
            object: "5d0a526593434d135848b8f7",
            user: "5d137abffd1e5e14b0e02cd5"
        }, (error, likes) => {
            if(error) return res.serverError(error);

            res.ok(likes);
        });

    }
};
