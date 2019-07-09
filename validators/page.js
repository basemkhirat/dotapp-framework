import Page from '~/models/page';
import Validator from 'validatorjs';

/**
 * validate page
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('page_slug_available', function (slug, id, x, passes) {

        let query = {slug: slug};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Page.findOne(query).exec((error, page) => {
            return page ? passes(false, req.lang("page.slug_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("title")) {
        rules.title = 'required';
    }

    if (creating || req.has("slug")) {
        rules.slug = 'alpha_dash|page_slug_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
