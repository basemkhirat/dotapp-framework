import {Mongoose, Schema} from './model';

let schema = Schema({

        name: {
            type: String,
            intl: true
        },

        slug: {
            type: String,
            slug: "name",
            slugPaddingSize: 4,
            uniqueSlug: true,
            permanent: true
        },

        code: {
            type: String
        },

        parent: {
            type: Schema.Types.ObjectId
        }

    }
);

schema.index({name: 1});
schema.index({code: 1});
schema.index({parent: 1});
schema.index({name: 'text', code: 'text'});

export default Mongoose.model("place", schema, "place");
