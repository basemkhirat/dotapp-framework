import {Mongoose, Schema} from './model';

let schema = Schema({

        name: {
            type: String,
            index: true
        },

        permissions: {
            type: Array,
            default:[],
            index: true
        },
    }
);

export default Mongoose.model("role", schema, "role");
