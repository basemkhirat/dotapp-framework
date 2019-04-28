import {Mongoose, Schema} from './model';

let schema = Schema({

        name: {
            type: String,
            index: true
        },

        description: {
            type: String,
            default: "",
            index: true
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            index: true
        }

    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

export default Mongoose.model("category", schema, "category");
