import {Mongoose, Schema} from './model';

let schema = Schema(
    {name: {type: String}},
    {
        versionKey: false,
        timestamps: true
    }
);

export default Mongoose.model("category", schema, "category");
