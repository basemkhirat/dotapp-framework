import Controller from "~/controllers/Controller";
import Category from '~/models/Category';

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
            if (!category) return res.notFound("Category not found");
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

        if (req.has("user")) {
            query.where("user", req.get("user"));
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("user");

        query.exec((error, categories) => {
            if (error) return res.serverError(error);
            return res.ok(res.attachPolicies(categories, "category"));
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
        category.description = req.param("description", category.description);
        category.user = req.user.id;

        category.save(function (error, category) {
            if (error) return res.serverError(error);
            return res.ok(category.id);
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
            if (!req.can("category.update", category)) return res.forbidden();
            if (!category) return res.notFound("Category not found");

            category.name = req.param("name", category.name);
            category.description = req.param("description", category.description);

            category.save(error => {
                if (error) return res.serverError(error);
                return res.ok(category);
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
            if (!req.can("category.delete", category)) return res.forbidden();
            if (!category) return res.notFound("Category not found");

            category.remove(error => {
                if (error) res.serverError(error);
                return res.ok(id);
            });
        });
    }
};

