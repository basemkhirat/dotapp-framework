import {Mongoose, Schema} from './model';
import Storage from '~/services/storage';
import Image from '~/services/media/handlers/file_image';
import path from 'path';

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

        image: {
            storage: {type: String},
            path: {type: String},
            mime: {type: String},
            width: {type: Number},
            height: {type: Number},
            size: {type: Number},
            thumbnails: {
                type: Array,
                default: [],
                hide: true
            }
        },

        data: {
            id: {type: Schema.Types.Mixed},
            storage: {type: String},
            path: {type: String},
            mime: {type: String},
            width: {type: Number},
            height: {type: Number},
            size: {type: Number},
            duration: {type: Number},
            embed: {type: Schema.Types.Mixed},
        },

        url: {
            type: String
        },

        thumbnails: {
            type: Object
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

schema.index({'data.width': 1});
schema.index({'data.height': 1});
schema.index({'data.size': 1});
schema.index({'data.duration': 1});
schema.index({'user': 1});
schema.index({'created_at': -1});
schema.index({'updated_at': -1});

schema.index({
    type: 'text',
    title: 'text',
    description: 'text',
    provider: 'text',
    'data.storage': 'text',
    'data.path': 'text',
    'data.mime': 'text',
});

schema.path("url").get(function () {
    if (this.provider === "file") {
        if (this.type === "image") {
            return Storage.disk(this.image.storage).url(this.image.path);
        } else {
            return Storage.disk(this.data.storage).url(this.data.path);
        }
    }
});

schema.path("thumbnails").get(function () {

    let thumbnails = {};

    if (this.image.path) {

        let sizes = this.image.thumbnails;

        sizes.forEach(size => {
            thumbnails[size] = Storage.disk(this.image.storage).url(Image.getThumbnailFileName(this.image.path, size));
        });

        thumbnails.default = Storage.disk(this.image.storage).url(this.image.path);

    } else if (this.data.path) {

        thumbnails.default = _url("default/files/" + path.extname(this.data.path).split(".").pop()) + ".png";

    } else {

        thumbnails.default = _url("default/providers/" + this.provider + ".png");

    }

    return thumbnails;
});

schema.pre('remove', function (next) {

    if (this.image) {

        Storage.disk(this.image.storage).delete(this.image.path);

        let sizes = this.image.thumbnails;

        sizes.forEach(size => {
            Storage.disk(this.image.storage).delete(Image.getThumbnailFileName(this.image.path, size));
        });
    }

    if (this.data) {
        Storage.disk(this.data.storage).delete(this.data.path);
    }

    next();
});

export default Mongoose.model("media", schema, "media");
