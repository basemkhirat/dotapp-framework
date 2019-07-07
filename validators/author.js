import Author from '~/models/author';
import Validator from 'validatorjs';

/**
 * validate author
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('author_name_available', function (name, id, x, passes) {

        let query = {name: name};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Author.findOne(query).exec((error, author) => {
            return author ? passes(false, req.lang("author.name_taken")) : passes();
        });
    });

    Validator.registerAsync('author_slug_available', function (slug, id, x, passes) {

        let query = {slug: slug};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Author.findOne(query).exec((error, author) => {
            return author ? passes(false, req.lang("author.slug_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("name")) {
        rules.name = 'required|author_name_available:' + req.param("id", 0);
    }

    if (creating || req.has("slug")) {
        rules.slug = 'alpha_dash|author_slug_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
