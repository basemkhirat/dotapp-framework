import Block from '~/models/block';
import Validator from 'validatorjs';

/**
 * validate block
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('block_name_available', function (name, id, x, passes) {

        let query = {name: name};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Block.findOne(query).exec((error, block) => {
            return block ? passes(false, req.lang("block.name_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("name")) {
        rules.name = 'required|block_name_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
