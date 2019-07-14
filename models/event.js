import moment from 'moment';
import {Mongoose, Schema} from './model';
import Tag from './tag';
import Like from './like';
import Resource from '~/services/media';
import Config from '~/services/config';

let schema = Schema({

    title: {
        type: String
    },

    slug: {
        type: String,
        slug: "title",
        slugPaddingSize: 4,
        uniqueSlug: true,
        permanent: true
    },

    excerpt: {
        type: String
    },

    content: {
        type: String
    },

    lang: {
        type: String,
        default: Config.get("i18n.defaultLocale")
    },

    address: {
        type: String
    },

    map: {
        type: String
    },

    type: {
        type: String,
        default: "free"
    },

    price: {
        type: Number,
        default: 0
    },

    currency: {
        type: String,
        default: "£"
    },

    media: {
        type: Schema.Types.ObjectId,
        ref: 'media'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],

    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],

    likes: {
        type: Number,
        default: 0
    },

    is_liked: {
        type: Boolean,
        default: false
    },

    followers: {
        type: Number,
        default: 0
    },

    registerations: {
        type: Number,
        default: 0
    },

    status: {
        type: Number,
        default: 0
    },

    published_at: {
        type: Date,
        default: Date.now
    },

    scheduled_at: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

schema.index({lang: 1});
schema.index({status: 1});
schema.index({media: 1});
schema.index({type: 1});
schema.index({price: 1});
schema.index({user: 1});
schema.index({categories: 1});
schema.index({tags: 1});
schema.index({likes: 1});
schema.index({followers: 1});
schema.index({created_at: -1});
schema.index({updated_at: -1});
schema.index({published_at: -1});
schema.index({scheduled_at: -1});
schema.index({
    title: 'text',
    slug: 'text',
    excerpt: 'text'
});

schema.virtual("published").get(function () {
    return moment(this.published_at).fromNow();
});

schema.virtual("scheduled").get(function () {
    return moment(this.scheduled_at).fromNow();
});

schema.pre("save", function (next) {

    if (this.tag_names !== undefined) {

        Tag.saveNames(this.tag_names, (error, tags) => {
            if (error) return next(error);

            console.log(this.tag_names, tags);

            this.tags = tags;

            next(null, this);
        });

    }else{
        next(null, this);
    }
});

schema.methods.isLikedBy = function (id, callback) {

    Like.where("type", "event")
        .where("user", id)
        .where("object", this._id)

        .countDocuments((error, count) => {
            if (error) return callback(error);
            callback(null, count > 0);
        });
};

schema.pre('save', function (next) {

    if (this.media_payload !== undefined) {

        Resource.create(this.media_payload, (error, media) => {
            if (error) return next(error);
            media.save((error, media) => {
                if (error) next(error);
                this.media = media.id;
                this.media_payload = undefined;
                next(null, this);
            });
        });

    } else {
        next(null, this);
    }
});

schema.virtual('all_likes', {
    ref: 'reservation',
    localField: '_id',
    foreignField: 'event',
    //count: true
});


export default Mongoose.model("event", schema, "event");
