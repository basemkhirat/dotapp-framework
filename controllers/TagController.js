import Controller from "~/controllers/Controller";
import Tag from '~/models/tag';
import async from "async";

export default class extends Controller {

    /**
     * Find one tag
     * @param req
     * @param res
     */
    findOne(req, res) {

        let id = req.param("id");

        Tag.findById(id).populate("user").exec(function (error, tag) {
            if (error) return res.serverError(error);
            if (!tag) return res.notFound(req.lang("tag.errors.tag_not_found"));

            return res.ok(res.attachPolicies(tag, "tag"));
        });

    }

    /**
     * Find tag by name
     * @param req
     * @param res
     */
    findByName(req, res) {

        let name = req.param("name");

        Tag.where("name", name).findOne()
            .populate("user")
            .exec(function (error, tag) {
                if (error) return res.serverError(error);
                if (!tag) return res.notFound(req.lang("tag.errors.tag_not_found"));

                return res.ok(res.attachPolicies(tag, "tag"));
            });
    }

    /**
     * Find all categories
     * @param req
     * @param res
     */
    find(req, res) {

        let query = Tag.find();

        if (req.filled("q")) {
            query.where("name", new RegExp(req.param("q")));
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("user");

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "tag")
            });
        });
    }

    /**
     * Create a new tag
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("tag.create")) return res.forbidden();

        let tag = new Tag();

        tag.name = req.param("name", tag.name);

        tag.save((error, tag) => {
            if (error) return res.serverError(error);
            return res.message(req.lang("tag.events.created")).ok(tag.id);
        });
    }

    /**
     * Update tag by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Tag.findById(id, (error, tag) => {
            if (error) return res.serverError(error);
            if (!tag) return res.notFound(req.lang("tag.errors.tag_not_found"));

            if (!req.can("tag.update", tag)) {
                return res.forbidden(req.lang("tag.errors.update_denied", {tag: tag.name}));
            }

            tag.name = req.param("name", tag.name);

            tag.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("tag.events.updated")).ok(id);
            });
        });
    }

    /**
     * Delete tag by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Tag.findById(id, (error, tag) => {
            if (error) return res.serverError(error);
            if (!tag) return res.notFound(req.lang("tag.errors.tag_not_found"));

            if (!req.can("tag.delete", tag)) {
                return res.forbidden(req.lang("tag.errors.delete_denied", {tag: tag.name}));
            }

            tag.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("tag.events.deleted")).ok(id);
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

        if (["delete"].indexOf(operation) <= -1) {
            return res.serverError(req.lang("tag.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                Tag.findById(id, (error, tag) => {

                    if (error) return res.serverError(error);
                    if (!tag) return res.notFound(req.lang("tag.errors.tag_not_found"));

                    if (operation === "delete") {

                        if (!req.can("tag.delete", tag)) {
                            return res.forbidden(req.lang("tag.errors.delete_denied", {
                                tag: tag.name
                            }));
                        }

                        tag.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    }
                });

            },

            (error, result = []) => {

                if (operation === "delete") {
                    return res.message(req.lang("tag.events.deleted")).ok(result);
                }
            }
        );

    }
};

