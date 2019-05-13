import Category from '~/models/category';
import Validator from 'validatorjs';

/**
 * validate category
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('category_name_available', function (name, id, x, passes) {

        let query = {name: name};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Category.findOne(query).exec((error, user) => {
            return user ? passes(false, req.lang("category.name_taken")) : passes();
        });
    });

    Validator.registerAsync('category_slug_available', function (slug, id, x, passes) {

        let query = {slug: slug};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Category.findOne(query).exec((error, user) => {
            return user ? passes(false, req.lang("category.slug_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("name")) {
        rules.name = 'required|category_name_available:' + req.param("id", 0);
    }

    if (creating || req.has("slug")) {
        rules.slug = 'alpha_dash|category_slug_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
