import Role from '~/models/role';
import Validator from 'validatorjs';



export default function (req, res) {

    Validator.registerAsync('role_name_available', function (name, id, x, passes) {

        let query = {name: name};

        if (id !== "0") {
            query._id = {'$ne': id};
        }

        Role.findOne(query).exec((error, user) => {
            return user ? passes(false, req.lang("role.name_taken")) : passes();
        });
    });

    let creating = !req.filled("id");

    let rules = {};

    if (creating || req.has("name")) {
        rules.name = 'required|role_name_available:' + req.param("id", 0);
    }

    return new Validator(req.all(), rules);
}
