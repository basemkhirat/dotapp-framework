import {Mongoose, Schema} from './model';

let schema = Schema({

    type: {
        type: String,
        index: true
    },

    title: {
        type: String,
        default: "",
        index: true
    },

    description: {
        type: String,
        default: "",
        index: true
    },

    provider: {
        type: String,
        default: "local",
        index: true
    },

    data: {
        storage: {type: String, index: true},
        path: {type: String, index: true},
        mime: {type: String, index: true},
        width: {type: Number, index: true},
        height: {type: Number, index: true},
        size: {type: Number, index: true},
        duration: {type: Number, index: true}
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});







export default Mongoose.model("media", schema, "media");
