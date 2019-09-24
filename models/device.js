import {Model, Schema} from 'dotapp/model';

let schema = Schema({

        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },

        name: {
            type: String
        },

        platform: {
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


schema.index({user: 1});
schema.index({created_at: -1});
schema.index({updated_at: -1});
schema.index({name: 'text'});

export default Model("device", schema, "device");
