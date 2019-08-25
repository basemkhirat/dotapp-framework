import {Model, Schema} from 'dotapp/model';
import slug from '~/models/plugins/slug';

let schema = Schema({

        name: {
            type: String,
            intl: true
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
schema.plugin(slug({name: "slug", source: "name"}));

export default Model("place", schema, "place");
