import Category from '~/models/category';
import Validator from 'validatorjs';

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

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("name")) {
        rules.name = 'required|category_name_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
