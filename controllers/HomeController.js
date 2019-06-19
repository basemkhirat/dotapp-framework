import Controller from './Controller';

import Category from "~/models/category";

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {

        Category.findById("5d090c27acc0492be1e889e7", function(error, doc){
            if(error) return res.serverError(error);
            if(!doc) return res.notFound("Doc not found");

            // access to the children

            doc.getChildren(function (err, docs) {
                res.ok(docs);
            });

            // // access to the children with condition and sort
            // doc.getChildren({
            //     condition: {name: /^a/},
            //     sort: {name: 1}
            // }, function (err, docs) {
            //     // ...
            // });


        });

        }
};
