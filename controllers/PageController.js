import Controller from "~/controllers/Controller";
import Page from '~/models/page';
import async from "async";

export default class extends Controller {

    /**
     * Find all categories
     * @param req
     * @param res
     */
    find(req, res) {

        let query = Page.find();

        if (req.filled("user")) {
            query.where("user", req.param("user"));
        }

        if (req.filled("status")) {
            query.where("status", req.param("status"));
        }
        if (req.filled("tags")) {
            let tags = Array.isArray(req.param("tags")) ? req.param("tags") : req.param("tags").toArray();
            query.where('tags').in(tags);
        }

        if (req.filled("q")) {
            query.where({$text: {$search: req.param("q")}});
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("tags").populate("user")
            .populate("media");

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "page")
            });
        });
    }

    /**
     * Find one page
     * @param req
     * @param res
     */
    findOne(req, res) {

        let id = req.param("id");

        Page.findById(id)
            .populate("tags")
            .populate("user")
            .populate("media")
            .exec((error, page) => {

                if (error) return res.serverError(error);
                if (!page) return res.notFound(req.lang("page.errors.page_not_found"));

                page.getContent((error, content) => {
                    if (error) return res.serverError(error);
                    page.content = content;
                    return res.ok(res.attachPolicies(page, "page"));
                });
            });
    }

    /**
     * Find page by slug
     * @param req
     * @param res
     */
    findBySlug(req, res) {

        let slug = req.param("slug");

        Page.where("slug", slug).findOne()
            .populate("tags")
            .populate("user")
            .populate("media")
            .exec((error, page) => {

                if (error) return res.serverError(error);
                if (!page) return res.notFound(req.lang("page.errors.page_not_found"));

                page.getContent((error, content) => {
                    if (error) return res.serverError(error);
                    page.content = content;
                    return res.ok(res.attachPolicies(page, "page"));
                });
            });
    }

    /**
     * Create a new page
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("page.create")) return res.forbidden();

        let page = new Page();

        page.title = req.param("title", page.title);
        page.slug = req.param("slug", page.slug);
        page.excerpt = req.param("excerpt", page.excerpt);
        page.content = req.param("content", page.content);
        page.media = req.param("media", page.media);
        page.user = req.user.id;
        page.lang = req.param("lang", page.lang);
        page.status = req.param("status", page.status);
        page.tag_names = req.param("tags");

        page.save((error, page) => {
            if (error) return res.serverError(error);
            return res.message(req.lang("page.events.created")).ok(page.id);
        });
    }

    /**
     * Update page by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Page.findById(id, (error, page) => {
            if (error) return res.serverError(error);
            if (!page) return res.notFound(req.lang("page.errors.page_not_found"));

            if (!req.can("page.update", page)) {
                return res.forbidden(req.lang("page.errors.update_denied", {page: page.title}));
            }

            page.title = req.param("title", page.title);
            page.slug = req.param("slug", page.slug);
            page.excerpt = req.param("excerpt", page.excerpt);
            page.content = req.param("content", page.content);
            page.media = req.param("media", page.media);
            page.status = req.param("status", page.status);
            page.lang = req.param("lang", page.lang);
            page.tag_names = req.param("tags");

            if (req.filled("tags")) {
                page.tag_names = req.param("tags");
            }

            page.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("page.events.updated")).ok(id);
            });
        });
    }

    /**
     * Delete page by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Page.findById(id, (error, page) => {
            if (error) return res.serverError(error);
            if (!page) return res.notFound(req.lang("page.errors.page_not_found"));

            if (!req.can("page.delete", page)) {
                return res.forbidden(req.lang("page.errors.delete_denied", {page: page.title}));
            }

            page.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("page.events.deleted")).ok(id);
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

        if (["delete", "update"].indexOf(operation) <= -1) {
            return res.serverError(req.lang("page.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                Page.findById(id, (error, page) => {

                    if (error) return res.serverError(error);
                    if (!page) return res.notFound(req.lang("page.errors.page_not_found"));

                    if (operation === "delete") {

                        if (!req.can("page.delete", page)) {
                            return res.forbidden(req.lang("page.errors.delete_denied", {
                                page: page.title
                            }));
                        }

                        page.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    } else if (operation === "update") {

                        if ("status" in data) {

                            if (!req.can("page.status", page)) {
                                return res.forbidden(req.lang("page.errors.status_denied", {
                                    page: page.title
                                }));
                            }

                            page.status = data.status || page.status;
                        }

                        page.save(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });
                    }
                });

            },

            (error, result = []) => {

                if (operation === "update") {
                    return res.message(req.lang("page.events.updated")).ok(result);
                }

                if (operation === "delete") {
                    return res.message(req.lang("page.events.deleted")).ok(result);
                }
            }
        );

    }

    /**
     * Find all page formats
     * @param req
     * @param res
     */
    findFormats(req, res) {

        let formats = Page.formats().map(format => {
            return {
                name: format,
                title: req.lang("page.formats." + format)
            }
        });

        return res.ok(formats);
    }
};

