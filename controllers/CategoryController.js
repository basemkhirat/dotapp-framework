import Controller from "~/controllers/Controller";
import Category from '~/models/category';
import async from "async";

export default class extends Controller {

    /**
     * Find one category
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("category.view")) return res.forbidden();

        let id = req.param("id");

        Category.findById(id).populate("user").exec(function (error, category) {
            if (error) return res.serverError(error);
            if (!category) return res.notFound(req.lang("category.errors.category_not_found"));

            return res.ok(res.attachPolicies(category, "category"));
        });

    }

    /**
     * Find all categories
     * @param req
     * @param res
     */
    find(req, res) {

        if (!req.can("category.view")) return res.forbidden();

        let query = Category.find();

        if (req.filled("user")) {
            query.where("user", req.param("user"));
        }

        if (req.filled("q")) {
            query.where({$text: {$search: req.param("q")}});
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("user");

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "category")
            });
        });
    }

    /**
     * Create a new category
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("category.create")) return res.forbidden();

        let category = new Category();

        category.name = req.param("name", category.name);
        category.slug = req.param("slug", category.slug);
        category.description = req.param("description", category.description);
        category.user = req.user.id;

        category.save(function (error, category) {
            if (error) return res.serverError(error);
            return res.message("category.events.created").ok(category.id);
        });
    }

    /**
     * Update category by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Category.findById(id, function (error, category) {
            if (error) return res.serverError(error);
            if (!category) return res.notFound(req.lang("category.errors.category_not_found"));

            if (!req.can("category.update", category)) {
                return res.forbidden(req.lang("category.errors.update_denied", {category: category.name}));
            }

            category.name = req.param("name", category.name);
            category.slug = req.param("slug", category.slug);
            category.description = req.param("description", category.description);

            category.save(error => {
                if (error) return res.serverError(error);
                return res.message("category.events.updated").ok(id);
            });
        });
    }

    /**
     * Delete category by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Category.findById(id, function (error, category) {
            if (error) return res.serverError(error);
            if (!category) return res.notFound(req.lang("category.errors.category_not_found"));

            if (!req.can("category.delete", category)) {
                return res.forbidden(req.lang("category.errors.delete_denied", {category: category.name}));
            }

            category.remove(error => {
                if (error) res.serverError(error);
                return res.message("category.events.deleted").ok(id);
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
            return res.serverError(req.lang("category.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, function (id, callback) {

                Category.findById(id, function (error, category) {

                    if (error) return res.serverError(error);
                    if (!category) return res.notFound(req.lang("category.errors.category_not_found"));

                    if (operation === "delete") {

                        if (!req.can("category.delete", category)) {
                            return res.forbidden(req.lang("category.errors.delete_denied", {
                                category: category.name
                            }));
                        }

                        category.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    }
                });

            },

            function (error, result = []) {

                if (operation === "delete") {
                    return res.message(req.lang("category.events.deleted")).ok(result);
                }
            }
        );

    }
};

