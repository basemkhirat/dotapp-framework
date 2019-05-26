import Controller from './Controller';

import Media from '~/models/media';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */

    index(req, res, next) {
        res.ok("Hi " + req.ipAddress());
    }

    test(req, res) {

        let id = req.param("id");

        Media.findById(id, function (error, media) {
            if (error) return res.serverError(error);
            if (!media) return res.notFound(req.lang("media.errors.media_not_found"));

            // if (!req.can("media.update", media)) {
            //     return res.forbidden(req.lang("media.errors.update_denied", {
            //         media: media.id
            //     }));
            // }


            return  res.ok(media);
            media.title = req.param("title", media.title);
            media.description = req.param("description", media.description);

            media.save(error => {
                if (error) return res.serverError(error);
                return res.ok(id);
            });
        });


    }
};
