import {Mongoose, Schema} from './model';

let schema = Schema({
        type: {
            type: String
        }
    }
);

schema.index({type: 1});

export default Mongoose.model("meta", schema, "meta");
