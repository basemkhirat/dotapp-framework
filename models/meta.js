import {Model, Schema} from 'dotapp/model';

let schema = Schema({
        type: {
            type: String
        }
    }
);

schema.index({type: 1});

export default Model("meta", schema, "meta");
