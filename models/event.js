import moment from 'moment';
import {Mongoose, Schema} from './model';
import Tag from './tag';

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
        type: String
    },

    location: {
        type: String
    },

    type: {
        type: String
    },

    price: {
        type: Number
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

    let self = this;

    Tag.saveNames(self.tag_names, (error, tags) => {
        if (error) return next(error);

        self.tags = tags;

        next(null, self);
    });
});


export default Mongoose.model("event", schema, "event");
