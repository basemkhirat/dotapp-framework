import {Model, Schema} from 'dotapp/model';
import async from 'async';

let schema = Schema({

        name: {
            type: String
        }

    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

/**
 * save a list of tag names
 * @param names
 * @param next
 */

schema.statics.saveNames = function (names, next) {

    let tagList = Array.isArray(names) ? names : [names];

    let Tag = this;

    async.map(tagList, function (name, callback) {

            Tag.where("name", name).findOne(function (error, tag) {

                if (error) return callback(error);

                if (tag) {

                    callback(null, tag.id);

                } else {

                    let tag = new Tag();

                    tag.name = name;

                    tag.save(function (error, tag) {
                        if (error) return callback(error);

                        callback(null, tag.id);
                    });
                }
            });
        },
        function (error, tags) {
            next(error, tags);
        }
    );
};

schema.index({created_at: -1});
schema.index({updated_at: -1});
schema.index({name: 'text'});

export default Model("tag", schema, "tag");
