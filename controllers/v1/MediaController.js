import Controller from "dotapp/controller";
import Media from "~/models/media";
import path from "path";
import { Storage, Config, Media as Resource } from "dotapp/services";

export default class extends Controller {
    /**
     * Find one media file
     * @param req
     * @param res
     */
    async findOne(req, res) {
        try {
            let id = req.param("id");

            let media = await Media.findById(id).populate("user");

            if (!media) {
                return res.notFound(req.lang("media.errors.media_not_found"));
            }

            return res.ok(media);
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Find all media files
     * @param req
     * @param res
     */
    async find(req, res) {
        try {
            let query = Media.find();

            if (req.filled("q")) {
                query.where({ $text: { $search: req.param("q") } });
            }

            if (req.filled("type")) {
                let type = req.param("type");
                let types = Array.isArray(type) ? type : type.toArray(",");
                query.where({ type: { $in: types } });
            }

            query.page(req.param("page"), req.param("limit"));

            query.order(
                req.param("sort_field", "created_at"),
                req.param("sort_type", "desc")
            );

            query.populate("user");

            let result = await query.execWithCount();

            return res.ok({
                total: result.total,
                docs: result.docs,
            });
        } catch (error) {
            return res.serverError(error);
        }
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

        let types = Object.keys(Config.get("media.types")).map((type) => {
            return {
                type: type,
                title: req.lang("media.types." + type),
            };
        });

        return res.ok(types);
    }

    /**
     * Find all media extensions
     * @param req
     * @param res
     */
    findExtensions(req, res) {
        if (!req.can("media.view")) return res.forbidden();

        return res.ok(
            [].concat.apply([], Object.values(Config.get("media.types")))
        );
    }

    /**
     * Create a new media
     * @param req
     * @param res
     * @returns {*}
     */
    async create(req, res) {
        try {
            if (!req.can("media.create")) return res.forbidden();

            if (!req.filled("payload")) {
                return res.validationError(
                    req.lang("media.errors.payload_required")
                );
            }

            let file = await Resource.save(req.param("payload"));

            let media = new Media(file);

            media.user = req.user.id;
            media.title = req.param("title", media.title);
            media.description = req.param("description", media.description);

            file = await media.save();

            return res.ok(file.id, req.lang("media.events.created"));
        } catch (error) {
            if (error instanceof Resource.FileTypeException) {
                return res.validationError([{ image: ["invalid file type"] }]);
            }

            if (error instanceof Resource.FileSizeException) {
                return res.validationError([{ image: ["file size exceeded"] }]);
            }

            return res.serverError(error);
        }
    }

    /**
     * Update media by id
     * @param req
     * @param res
     */
    async update(req, res) {
        try {
            let id = req.param("id");

            let media = await Media.findById(id);

            if (!media)
                return res.notFound(req.lang("media.errors.media_not_found"));

            if (!req.can("media.update", media)) {
                return res.forbidden(
                    req.lang("media.errors.update_denied", {
                        media: media.id,
                    })
                );
            }

            media.title = req.param("title", media.title);
            media.description = req.param("description", media.description);

            let file = await media.save();

            res.ok(file.id, req.lang("media.events.updated"));
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Update thumbnail by id
     * @param req
     * @param res
     */
    async updateThumbnail(req, res) {
        try {
            let id = req.param("id");
            let size = req.param("size");
            let data = req.param("data");

            let sizes = Config.get("media.image.thumbnails")
                .map((thumbnail) => thumbnail.name)
                .map((name) => {
                    return name;
                });

            if (sizes.indexOf(size) < 0) {
                return res.validationError(
                    req.lang("media.errors.invalid_size")
                );
            }

            if (!req.filled("data"))
                return res.validationError(
                    req.lang("media.errors.base64_required")
                );

            let matches = data.match(
                /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/
            );

            if (!matches || matches.length !== 3) {
                return res.validationError(
                    req.lang("media.errors.invalid_base64")
                );
            }

            data = matches[2];

            let media = await Media.findById(id);

            if (!media) {
                return res.notFound(req.lang("media.errors.media_not_found"));
            }

            if (!req.can("media.update", media)) {
                return res.forbidden(
                    req.lang("media.errors.update_denied", {
                        media: media.id,
                    })
                );
            }

            if (media.type !== "image") {
                return res.validationError(req.lang("media.errors.not_image"));
            }

            let image_path = media.image.path;
            let thumbnail_path =
                path.dirname(image_path) +
                "/" +
                size +
                "-" +
                path.basename(image_path);

            await Storage.disk("uploads").save(
                thumbnail_path,
                Buffer.from(data, "base64"),
                "binary"
            );

            return res.ok(id, req.lang("media.events.updated"));
        } catch (error) {
            return res.serverError(error);
        }
    }

    /**
     * Delete media by id
     * @param req
     * @param res
     */
    async destroy(req, res) {
        try {
            let id = req.param("id");

            let media = await Media.findById(id);

            if (!media) {
                return res.notFound(req.lang("media.errors.media_not_found"));
            }

            if (!req.can("media.delete", media)) {
                return res.forbidden(
                    req.lang("media.errors.delete_denied", {
                        media: media.name,
                    })
                );
            }

            await media.remove();

            return res.ok(id, req.lang("media.events.deleted"));
        } catch (error) {
            return res.serverError(error);
        }
    }
}
