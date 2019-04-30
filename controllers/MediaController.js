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

        let query = Media.find();

        if (req.filled("q")) {
            query.where({$text: {$search: req.param("q")}});
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "media")
            });
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
            if (error) return res.serverError(error);

            media.user = req.user.id;
            media.title = req.param("title", media.title);
            media.description = req.param("description", media.description);

            media.save((error, media) => {
                if (error) return res.serverError(error);
                if (media) return res.ok(media.id);
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

            media.save(error => {
                if (error) return res.serverError(error);
                return res.ok(id);
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
            if (!req.can("media.delete", media)) return res.forbidden();
            if (!media) return res.notFound("Media not found");
            media.remove(error => {
                if (error) res.serverError(error);
                return res.ok(id);
            });
        });
    }
};
