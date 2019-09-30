import Controller from "~/controllers/Controller";
import Author from '~/models/author';
import async from "async";
import moment from 'moment';

export default class extends Controller {

    /**
     * Find one author
     * @param req
     * @param res
     */
    findOne(req, res) {

        let id = req.param("id");

        Author.findById(id).populate("user").populate("image").exec((error, author) => {
            if (error) return res.serverError(error);
            if (!author) return res.notFound(req.lang("author.errors.author_not_found"));

            return res.ok(res.attachPolicies(author, "author"));
        });
    }

    /**
     * Find author by slug
     * @param req
     * @param res
     */
    findBySlug(req, res) {

        let slug = req.param("slug");

        Author.where("slug", slug).findOne()
            .populate("user")
            .populate("image")
            .populate("parent")
            .exec((error, author) => {
                if (error) return res.serverError(error);
                if (!author) return res.notFound(req.lang("author.errors.author_not_found"));

                return res.ok(res.attachPolicies(author, "author"));
            });
    }

    /**
     * Find all authors
     * @param req
     * @param res
     */
    find(req, res) {

        let query = Author.find();

        if (req.filled("user")) {
            query.where("user", req.param("user"));
        }

        if (req.filled("q")) {
            query.where("name", new RegExp(req.param("q")));
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("user").populate("image");

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "author")
            });
        });
    }

    /**
     * Build a chart
     * @param req
     * @param res
     * @returns {*}
     */
    chart(req, res) {

        let duration = req.param("duration", 10);
        let period = req.param("period", "days");
        let start = req.param("start", moment().subtract(duration, period).format());
        let end = req.param("end", moment().format());

        let moment_start = moment(start);
        let moment_end = moment(end);

        let lists = [];
        let started = moment_start;

        while (true) {

            started = started.add(1, period);

            if (started <= moment_end) {
                lists.push(started.format());
            } else {
                break;
            }
        }

        return async.map(lists, (date, callback) => {

            let query = Author.find();

            query.where({
                created_at: {
                    '$gte': moment(date).startOf(period).format(),
                    '$lte': moment(date).endOf(period).toDate()
                }
            });

            query.countDocuments((error, total) => {
                if (error) return callback(error);

                callback(null, {
                    date: moment(date).startOf(period).format(),
                    total: total
                })
            });


        }, (error, result = []) => {
            return res.ok(result);
        });

    }

    /**
     * Create a new author
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("author.manage")) return res.forbidden();

        let author = new Author();

        author.name = req.param("name", author.name);
        author.slug = req.param("slug", author.slug);
        author.description = req.param("description", author.description);
        author.image = req.param("image", author.image);
        author.user = req.user.id;

        author.save((error, author) => {
            if (error) return res.serverError(error);
            return res.message(req.lang("author.events.created")).ok(author.id);
        });
    }

    /**
     * Update author by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Author.findById(id, (error, author) => {
            if (error) return res.serverError(error);
            if (!author) return res.notFound(req.lang("author.errors.author_not_found"));

            if (!req.can("author.manage", author)) {
                return res.forbidden(req.lang("author.errors.update_denied", {author: author.name}));
            }

            author.name = req.param("name", author.name);
            author.slug = req.param("slug", author.slug);
            author.description = req.param("description", author.description);
            author.image = req.param("image", author.image);

            author.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("author.events.updated")).ok(id);
            });
        });
    }

    /**
     * Delete author by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Author.findById(id, (error, author) => {
            if (error) return res.serverError(error);
            if (!author) return res.notFound(req.lang("author.errors.author_not_found"));

            if (!req.can("author.manage", author)) {
                return res.forbidden(req.lang("author.errors.delete_denied", {author: author.name}));
            }

            author.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("author.events.deleted")).ok(id);
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
            return res.serverError(req.lang("author.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                Author.findById(id, (error, author) => {

                    if (error) return res.serverError(error);
                    if (!author) return res.notFound(req.lang("author.errors.author_not_found"));

                    if (operation === "delete") {

                        if (!req.can("author.manage", author)) {
                            return res.forbidden(req.lang("author.errors.delete_denied", {
                                author: author.name
                            }));
                        }

                        author.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    }
                });
            },

            (error, result = []) => {

                if (operation === "delete") {
                    return res.message(req.lang("author.events.deleted")).ok(result);
                }
            }
        );

    }
};

