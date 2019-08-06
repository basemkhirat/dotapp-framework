import {Mongoose, Schema} from './model';
import Post from '~/models/post';
import Event from '~/models/event';
import slug from '~/models/plugins/slug';

let schema = Schema({

        name: {
            type: String
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
            default: [],
            set: function (items) {
                return Array.isArray(items) ? items : items.toArray(",");
            }
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

        Post.find({_id: {$in: this.items}, type: "post"})
            .populate("media").populate("categories").populate("tags")
            .exec((error, items) => {
                if (error) return callback(error);
                callback(null, items);
            });


    } else if (this.type === "article") {

        Post.find({_id: {$in: this.items}, type: "article"})
            .populate("author").populate("media").populate("categories").populate("tags")
            .populate({
                path: 'author',
                populate: {
                    path: 'image'
                }
            })
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
schema.plugin(slug({name: "slug", source: "name"}));


export default Mongoose.model("block", schema, "block");
