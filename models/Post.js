import {Mongoose, Schema} from './model';

let schema = Schema({

    title: {
        type: String,
        index: true
    },

    excerpt: {
        type: String,
        index: true
    },

    content: {
        type: String,
        index: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        index: true
    },

    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'category',
        index: true
    }
});

export default Mongoose.model("post", schema, "post");
