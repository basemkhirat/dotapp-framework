import Post from '~/models/event';
import Validator from 'validatorjs';

/**
 * validate event
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('event_slug_available', function (slug, id, x, passes) {

        let query = {slug: slug};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Post.findOne(query).exec((error, event) => {
            return event ? passes(false, req.lang("event.slug_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("title")) {
        rules.title = 'required';
    }

    if (creating || req.has("slug")) {
        rules.slug = 'alpha_dash|event_slug_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
