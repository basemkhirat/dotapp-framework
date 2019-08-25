import {Model, Schema} from 'dotapp/model';
import slug from '~/models/plugins/slug';

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
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

schema.index({user: 1});
schema.index({created_at: -1});
schema.index({updated_at: -1});
schema.index({name: 'text', slug: 'text', description: 'text'});
schema.plugin(slug({name: "slug", source: "name"}));

export default Model("author", schema, "author");
