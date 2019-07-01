
import Controller from './Controller';

import Comment from '~/models/comment';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    index(req, res, next) {

        Comment.get({
            type: "post",
            object: "5d0a526593434d135848b8f8",
          //  user: "5d137abffd1e5e14b0e02cd5",
          //  body: "test body.."
        }, (error, comments) => {
            if(error) return res.serverError(error);

            res.ok(comments);
        });

    }
};
