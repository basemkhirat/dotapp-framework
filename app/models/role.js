import { Mongoose, Schema } from './model';

let schema = Schema(
    {
        name: {type: String, unique: true},
        permissions: {type: Array},
    }, {
        versionKey: false,
        timestamps: false
    }
);

export default Mongoose.model("role", schema, "role");
