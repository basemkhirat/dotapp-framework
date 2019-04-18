import { Mongoose, Schema } from './model';

let schema = Schema(
    {
        title: {type: String},
        excerpt: {type: String, required: true},
        content: {type: String, required: true},
        user: {type: Schema.Types.ObjectId, ref: 'user'},
        categories: {type: [Schema.Types.ObjectId], ref: 'category'}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default Mongoose.model("post", schema, "post");
