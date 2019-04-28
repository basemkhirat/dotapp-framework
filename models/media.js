import {Mongoose, Schema} from './model';
import Config from '~/services/config';
import Storage from '~/services/storage';
import Image from '~/services/media/handlers/image';

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
            ref: 'user',
            index: true
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

schema.virtual("url").get(function () {
    return Storage.disk(this.data.storage).url(this.data.path);
});

schema.virtual("thumbnails").get(function () {

    let sizes = Config.get("media.image.thumbnails")
        .map(thumbnail => thumbnail.name)
        .map(name => {
            return name;
        });

    let thumbnails = {};

    if (this.type === "image") {
        sizes.forEach((size) => {
            thumbnails[size] = Storage.disk(this.data.storage).url(Image.getThumbnailFileName(this.data.path, size));
        });
    }

    return thumbnails;
});

export default Mongoose.model("media", schema, "media");
