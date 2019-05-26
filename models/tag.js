import {Mongoose, Schema} from './model';

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

schema.index({created_at: -1});
schema.index({updated_at: -1});
schema.index({name: 'text'});

export default Mongoose.model("tag", schema, "tag");
