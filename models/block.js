import {Mongoose, Schema} from './model';
import Post from '~/models/post';
import Event from '~/models/event';

let schema = Schema({

        name: {
            type: String
        },

        slug: {
            type: String,
            slug: "name",
            slugPaddingSize: 4,
            uniqueSlug: true,
            permanent: true
        },

        description: {
            type: String,
            default: ""
        },

        type: {
            type: String,
            default: "post"
        },

        items: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

schema.methods.getItems = function (callback) {

    if (this.type === "post") {

        Post.find({_id: {$in: this.items}})
            .populate("media").populate("categories").populate("tags")
            .exec((error, items) => {
            if (error) return callback(error);
            callback(null, items);
        });

    } else if (this.type === "event") {

        Event.find({_id: {$in: this.items}})
            .populate("media").populate("categories").populate("tags")
            .exec((error, items) => {
            if (error) return callback(error);
            callback(null, items);
        });

    } else {
        callback(null, []);
    }
};

schema.index({created_at: -1});
schema.index({updated_at: -1});
schema.index({name: 'text', description: 'text'});

export default Mongoose.model("block", schema, "block");
