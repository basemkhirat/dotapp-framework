import {Mongoose, Schema} from './model';
import Config from '~/services/config';
import Storage from '~/services/storage';
import Image from '~/services/media/handlers/file_image';

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
            size: {type: Number}
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
    if(this.provider === "file") {
        return Storage.disk(this.image.storage).url(this.image.path);
    }
});

schema.path("thumbnails").get(function () {

    let sizes = Config.get("media.image.thumbnails")
        .map(thumbnail => thumbnail.name)
        .map(name => {
            return name;
        });

    let thumbnails = {};

    if (this.image.path) {
        sizes.forEach((size) => {
            thumbnails[size] = Storage.disk(this.image.storage).url(Image.getThumbnailFileName(this.image.path, size));
        });
    }

    return thumbnails;
});

export default Mongoose.model("media", schema, "media");
