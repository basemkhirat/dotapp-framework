import Controller from "~/controllers/Controller";
import Media from '~/models/media';
import Resource from '~/services/media';

export default class extends Controller {

    /**
     * Find one media file
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("media.view")) return res.forbidden();

        let id = req.param("id");

        Media.findById(id, function (error, media) {
            if (error) return res.serverError(error);
            if (!media) return res.notFound("Media not found");
            return res.ok(res.attachPolicies(media, "media"));
        });

    }

    /**
     * Find all media files
     * @param req
     * @param res
     */
    find(req, res) {

        if (!req.can("media.view")) return res.forbidden();

        Media.find(function (error, medias) {
            if (error) return res.serverError(error);
            return res.ok(res.attachPolicies(medias, "media"));
        });

    }

    /**
     * Create a new media
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("media.create")) return res.forbidden();

        let payload = req.param("payload");

        Resource.create(payload, function (error, media) {
            if(error) return res.serverError(error);
            media.title = req.param("title", media.title);
            media.description = req.param("description", media.description);
            media.save((error, media) => {
                if (error) return res.serverError(error);
                if (media) return res.ok(media);
            });
        });
    }

    /**
     * Update media by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Media.findById(id, function (error, media) {
            if (error) return res.serverError(error);
            if (!req.can("media.update", media)) return res.forbidden();
            if (!media) return res.notFound("Media not found");
            media.title = req.param("title", media.title);
            media.description = req.param("description", media.description);
            media.save(function (error, media) {
                if (error) return res.serverError(error);
                return res.ok(media);
            });
        });
    }

    /**
     * Delete media by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Media.findById(id, function (error, media) {
            if (error) return res.serverError(error);
            if (!req.can("media.update", media)) return res.forbidden();
            if (!media) return res.notFound("Media not found");
            Media.remove(function (error, media) {
                if (error) res.serverError(error);
                return res.ok(media);
            });
        });
    }
};

