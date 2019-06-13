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

        Post.findById("5d00fa90f6d5f65df43fbe60", function (error, post) {

            post.getContent(content => {
                return res.ok(content);
            });

        });



    }
};
