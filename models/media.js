import {Mongoose, Schema} from './model';
import Config from '~/services/config';
import Storage from '~/services/storage';
import Image from '~/services/media/handlers/image';

let schema = Schema({

        type: {
            type: String
        },

        title: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        },

        provider: {
            type: String,
            default: "local"
        },

        data: {
            storage: {type: String},
            path: {type: String},
            mime: {type: String},
            width: {type: Number},
            height: {type: Number},
            size: {type: Number},
            duration: {type: Number}
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);


schema.index({
    type: 'text',
    title: 'text',
    description: 'text',
    provider: 'text',
    'data.storage': 'text',
    'data.path': 'text',
    'data.mime': 'text',
    'data.width': 1,
    'data.height': 1,
    'data.size': 1,
    'data.duration': 1,
    user: 1,
    created_at: -1,
    updated_at: -1
});


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