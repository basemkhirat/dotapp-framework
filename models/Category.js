import {Mongoose, Schema} from './model';

let schema = Schema({

    name: {
        type: String,
        index: true
    }

});

export default Mongoose.model("category", schema, "category");
