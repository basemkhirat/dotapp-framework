import Category from '~/models/category';

export default function (req) {
    req.check('name', "Category name is required").notEmpty();
    req.check('name', "Category name is already taken").custom(name => {
        return new Promise((resolve, reject) => {
            Category.findOne({name: name, _id: { $ne: req.param("id") }}).exec((error, user) => {
                return user ? reject() : resolve();
            });
        });
    });

}
