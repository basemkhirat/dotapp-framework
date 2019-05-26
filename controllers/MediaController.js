import Controller from "~/controllers/Controller";
import Media from '~/models/media';
import Resource from '~/services/media';
import async from "async";
import path from 'path';
import Storage from '~/services/storage';
import Config from '~/services/config';

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
     * Find all media thumbnails
     * @param req
     * @param res
     */
    findThumbnails(req, res) {

        if (!req.can("media.view")) return res.forbidden();

        return res.ok(Config.get("media.image.thumbnails"));
    }

    /**
     * Find all media types
     * @param req
     * @param res
     */
    findTypes(req, res) {

        if (!req.can("media.view")) return res.forbidden();

        return res.ok(Object.keys(Config.get("media.types")));
    }

    /**
     * Find all media extensions
     * @param req
     * @param res
     */
    findExtensions(req, res) {

        if (!req.can("media.view")) return res.forbidden();

        return res.ok([].concat.apply([], Object.values(Config.get("media.types"))));
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
                if (media) return res.message(req.lang("media.events.created")).ok(media.id);
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

            if (!req.can("media.update", media)) {
                return res.forbidden(req.lang("media.errors.update_denied", {
                    media: media.id
                }));
            }

            media.title = req.param("title", media.title);
            media.description = req.param("description", media.description);

            media.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("media.events.updated")).ok(id);
            });
        });
    }

    /**
     * Update thumbnail by id
     * @param req
     * @param res
     */
    updateThumbnail(req, res) {

        let id = req.param("id");
        let size = req.param("size");
        let data = req.param("data");

        let sizes = Config.get("media.image.thumbnails")
            .map(thumbnail => thumbnail.name)
            .map(name => {
                return name;
            });

        if (sizes.indexOf(size) < 0) {
            return res.validationError(req.lang("media.errors.invalid_size"));
        }

        if (!req.filled("data")) return res.validationError(req.lang("media.errors.base64_required"));

        let matches = data.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            return res.validationError(req.lang("media.errors.invalid_base64"));
        }

        data = matches[2];

        Media.findById(id, function (error, media) {
            if (error) return res.serverError(error);
            if (!media) return res.notFound(req.lang("media.errors.media_not_found"));

            if (!req.can("media.update", media)) {
                return res.forbidden(req.lang("media.errors.update_denied", {
                    media: media.id
                }));
            }

            if (media.type !== "image") {
                return res.validationError(req.lang("media.errors.not_image"));
            }

            let image_path = media.image.path;
            let thumbnail_path = path.dirname(image_path) + "/" + size + "-" + path.basename(image_path);

            Storage.disk("uploads")
                .save(thumbnail_path, Buffer.from(data, 'base64'), 'binary', error => {
                    if (error) return res.serverError(error);

                    return res.message(req.lang("media.events.updated")).ok(id);
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

            if (!req.can("media.delete", media)) {
                return res.forbidden(req.lang("media.errors.delete_denied", {
                    media: media.name
                }));
            }

            media.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("media.events.deleted")).ok(id);
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

