import Tag from '~/models/tag';
import Validator from 'validatorjs';

/**
 * validate tag
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('tag_name_available', function (name, id, x, passes) {

        let query = {name: name};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Tag.findOne(query).exec((error, tag) => {
            return tag ? passes(false, req.lang("tag.name_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("name")) {
        rules.name = 'required|tag_name_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
