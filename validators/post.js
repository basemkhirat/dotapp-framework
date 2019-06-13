import Post from '~/models/post';
import Validator from 'validatorjs';

/**
 * validate post
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('post_slug_available', function (slug, id, x, passes) {

        let query = {slug: slug};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Post.findOne(query).exec((error, post) => {
            return post ? passes(false, req.lang("post.slug_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("title")) {
        rules.title = 'required';
    }

    if (creating || req.has("slug")) {
        rules.slug = 'alpha_dash|post_slug_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
