import {Model, Schema} from 'dotapp/model';

let schema = Schema({

        email: {
            type: String
        },

        status: {
            type: Number,
            default: 0
        }

    }, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

schema.index({created_at: -1});
schema.index({updated_at: -1});
schema.index({email: 'text'});

export default Model("subscription", schema, "subscription");
