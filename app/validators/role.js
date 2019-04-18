import Role from '~/models/role';

export default function (req) {
    req.check('name', "Role name is required").notEmpty();
    req.check('name', "Role name is already taken").custom(name => {
        return new Promise((resolve, reject) => {
            Role.findOne({name: name, _id: { $ne: req.param("id") } }).exec((error, user) => {
                return user ? reject() : resolve();
            });
        });
    });

}
