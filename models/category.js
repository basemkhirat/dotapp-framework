import {Mongoose, Schema} from './model';

let schema = Schema({

        name: {
            type: String
        },

        slug: {
            type: String,
            slug: "name",
            slugPaddingSize: 4,
            unique: true,
            permanent: true
        },

        description: {
            type: String,
            default: ""
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

schema.index({
    name: 'text',
    description: 'text',
    user: 1,
    created_at: -1,
    updated_at: -1
});

export default Mongoose.model("category", schema, "category");
