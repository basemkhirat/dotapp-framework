import {Mongoose, Schema} from './model';
import slug from '~/models/plugins/slug';
import Category from './category';

let schema = Schema({

        name: {
            type: String
        },

        description: {
            type: String,
            default: ""
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },

        image: {
            type: Schema.Types.ObjectId,
            ref: 'media'
        },

        parent: {
            type: Schema.Types.ObjectId,
            ref: 'category'
        },
        children: {
            type: Array
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

let getNestedChildren = (parent, items = [], callback) => {
    Category.where("parent", parent).exec((error, categories) => {
        if (error) return callback(null);
        callback(null, categories);
    });
};

schema.methods.getChildren = function (callback) {
    getNestedChildren(this.id, [], function (error, children) {
        callback(error, children);
    });
};


schema.index({user: 1});
schema.index({created_at: -1});
schema.index({updated_at: -1});
schema.index({name: 'text', slug: 'text', description: 'text'});
schema.plugin(slug({name: "slug", source: "name"}));

export default Mongoose.model("category", schema, "category");
