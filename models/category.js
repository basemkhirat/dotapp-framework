import {Mongoose, Schema} from './model';

let schema = Schema({

        name: {
            type: String
        },

        slug: {
            type: String,
            slug: "name",
            slugPaddingSize: 4,
            uniqueSlug:true,
            permanent: true
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

export default Mongoose.model("category", schema, "category");
