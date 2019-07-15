import Place from '~/models/place';
import Validator from 'validatorjs';

/**
 * validate place
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('place_name_available', function (name, id, x, passes) {

        let query = {name: name};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Place.findOne(query).exec((error, place) => {
            return place ? passes(false, req.lang("place.name_taken")) : passes();
        });
    });

    Validator.registerAsync('place_slug_available', function (slug, id, x, passes) {

        let query = {slug: slug};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Place.findOne(query).exec((error, place) => {
            return place ? passes(false, req.lang("place.slug_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("name")) {
        rules.name = 'required|place_name_available:' + req.param("id", 0);
    }

    if (creating || req.has("slug")) {
        rules.slug = 'alpha_dash|place_slug_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
