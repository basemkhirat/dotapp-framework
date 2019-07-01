import Controller from "~/controllers/Controller";
import Block from '~/models/block';
import async from "async";

export default class extends Controller {

    /**
     * Find one block
     * @param req
     * @param res
     */
    findOne(req, res) {

        let id = req.param("id");

        Block.findById(id).exec((error, block) => {
            if (error) return res.serverError(error);
            if (!block) return res.notFound(req.lang("block.errors.block_not_found"));

            block.getItems((error, items) => {
                if (error) return res.serverError(error);
                block.items = items;
                return res.ok(res.attachPolicies(block, "block"));
            });
        });
    }

    /**
     * Find one block by slug
     * @param req
     * @param res
     */
    findBySlug(req, res) {

        let slug = req.param("slug");

        Block.where("slug", slug).findOne().exec((error, block) => {
            if (error) return res.serverError(error);
            if (!block) return res.notFound(req.lang("block.errors.block_not_found"));

            block.getItems((error, items) => {
                if (error) return res.serverError(error);
                block.items = items;
                return res.ok(res.attachPolicies(block, "block"));
            });
        });
    }

    /**
     * Find all categories
     * @param req
     * @param res
     */
    find(req, res) {

        let query = Block.find().where("parent", req.param("parent"));

        if (req.filled("q")) {
            query.where({$text: {$search: req.param("q")}});
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);

            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "block")
            });
        });
    }

    /**
     * Create a new block
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("block.create")) return res.forbidden();

        let block = new Block();

        block.name = req.param("name", block.name);
        block.description = req.param("description", block.description);
        block.type = req.param("type", block.type);
        block.items = req.param("items", block.items);

        block.save((error, block) => {
            if (error) return res.serverError(error);
            return res.message(req.lang("block.events.created")).ok(block.id);
        });
    }

    /**
     * Update block by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Block.findById(id, (error, block) => {
            if (error) return res.serverError(error);
            if (!block) return res.notFound(req.lang("block.errors.block_not_found"));

            if (!req.can("block.update", block)) {
                return res.forbidden(req.lang("block.errors.update_denied", {block: block.name}));
            }

            block.name = req.param("name", block.name);
            block.description = req.param("description", block.description);
            block.type = req.param("type", block.type);
            block.items = req.param("items", block.items);

            block.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("block.events.updated")).ok(id);
            });
        });
    }

    /**
     * Delete block by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Block.findById(id, (error, block) => {
            if (error) return res.serverError(error);
            if (!block) return res.notFound(req.lang("block.errors.block_not_found"));

            if (!req.can("block.delete", block)) {
                return res.forbidden(req.lang("block.errors.delete_denied", {block: block.name}));
            }

            block.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("block.events.deleted")).ok(id);
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
            return res.serverError(req.lang("block.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                Block.findById(id, (error, block) => {

                    if (error) return res.serverError(error);
                    if (!block) return res.notFound(req.lang("block.errors.block_not_found"));

                    if (operation === "delete") {

                        if (!req.can("block.delete", block)) {
                            return res.forbidden(req.lang("block.errors.delete_denied", {
                                block: block.name
                            }));
                        }

                        block.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    }
                });
            },

            (error, result = []) => {

                if (operation === "delete") {
                    return res.message(req.lang("block.events.deleted")).ok(result);
                }
            }
        );

    }
};

