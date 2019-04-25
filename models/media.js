import {Mongoose, Schema} from './model';
import Config from '~/services/config';

let base_url = "http://localhost:3000/uploads";

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
        path: {
            type: String,
            index: true
        },
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

schema.virtual("url").get(function () {
    return base_url + "/" + this.data.path;
});

schema.virtual("thumbnails").get(function () {

    return Config.get("media.image.thumbnails")
        .map(thumbnail => thumbnail.name)
        .map(name => {
            return name;
        });

});

export default Mongoose.model("media", schema, "media");
