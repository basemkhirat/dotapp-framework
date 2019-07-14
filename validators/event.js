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

    if (creating || req.has("type")) {
        rules.type = 'required';
    }


    if (creating && req.param("type") === "paid") {
        rules.price = 'required';
        rules.currency = 'required';
    }


    if (creating) {

        if (req.has("media")) {
            rules.media = 'required';
        } else if (req.has("media_payload")) {
            rules.media_payload = 'required';
        } else {
            rules.media = 'required';
        }
    } else {

        rules.media = 'required';

    }


    // if (!req.has("media_payload") && !req.has("media")) {
    //     rules.media_payload = 'required';
    // }

    if (creating || req.has("categories")) {
        rules.categories = 'required';
    }

    if (creating || req.has("slug")) {
        rules.slug = 'alpha_dash|event_slug_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
