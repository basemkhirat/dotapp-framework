import Controller from "~/controllers/Controller";
import Media from '~/models/media';
import Resource from '~/services/media';
import async from "async";

export default class extends Controller {

    /**
     * Find one media file
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("media.view")) return res.forbidden();

        let id = req.param("id");

        Media.findById(id).populate("user").exec(function (error, media) {
            if (error) return res.serverError(error);
            if (!media) return res.notFound(req.lang("media.errors.media_not_found"));
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

        if (req.filled("type")) {
            query.where("type", req.param("type"));
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("user");

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
            if (!media) return res.notFound(req.lang("media.errors.media_not_found"));

            if (!req.can("media.update", media)) return res.forbidden();

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
            if (!media) return res.notFound(req.lang("media.errors.media_not_found"));

            if (!req.can("media.delete", media)) return res.forbidden();

            media.remove(error => {
                if (error) res.serverError(error);
                return res.ok(id);
            });
        });
    }

    /**
     * Bulk operations
     * @param req
     * @param res
     */
    bulk(req, res) {

        let operation = req.param("operation");
        let ids = req.param("ids");
        let data = req.param("data");

        ids = Array.isArray(ids) ? ids : ids.toArray(",");

        if (req.filled("data")) {
            data = typeof data === 'object' ? data : JSON.parse(data);
        }

        if (["update", "delete"].indexOf(operation) <= -1) {
            return res.serverError(req.lang("media.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, function (id, callback) {

                Media.findById(id, function (error, media) {

                    if (error) return res.serverError(error);
                    if (!media) return res.notFound(req.lang("media.errors.media_not_found"));

                    if (operation === "delete") {

                        if (!req.can("media.delete", media)) {
                            return res.forbidden(req.lang("media.errors.delete_denied", {
                                media: media.name
                            }));
                        }

                        media.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    } else if (operation === "update") {

                        if (!req.can("media.update", media)) {
                            return res.forbidden(req.lang("media.errors.update_denied", {
                                media: media.id
                            }));
                        }

                        if ("title" in data) {
                            media.title = data.title || media.title;
                        }

                        if ("description" in data) {
                            media.description = data.description || media.description;
                        }

                        media.save(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });
                    }
                });

            },

            function (error, result = []) {

                if (operation === "update") {
                    return res.message(req.lang("media.events.updated")).ok(result);
                }

                if (operation === "delete") {
                    return res.message(req.lang("media.events.deleted")).ok(result);
                }
            }
        );

    }
};

