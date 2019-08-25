import {Model, Schema} from 'dotapp/model';

let schema = Schema({

    type: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    object: {
        type: Schema.Types.ObjectId,
        ref: 'event'
    },

    body: {
        type: String
    }

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

schema.index({type: 1});
schema.index({user: 1});
schema.index({object: 1});
schema.index({created_at: -1});
schema.index({updated_at: -1});

schema.statics.validate = function (data, callback) {

    if (!data.type) {
        return callback("Type required", false);
    }

    if (!data.object) {
        return callback("Object required", false);
    }

    if (!data.user) {
        return callback("User required", false);
    }

    if (!data.body) {
        return callback("Body required", false);
    }

    return callback(null, true);
};

schema.statics.get = function (data, callback) {

    let Comment = this;

    Comment.where("type", data.type)
        .where("object", data.object)
        .populate({path: "user", populate: { path : "photo"}})
        .populate("object")
        .execWithCount((error, result) => {

            if (error) return callback(error);

            return callback(null, {
                total: result.total,
                docs: result.docs
            });
        });
};

schema.statics.add = function (data, callback) {

    let Comment = this;

    Comment.validate(data, (error) => {
        if (error) return callback(error);

        let comment = new Comment();

        comment.type = data.type;
        comment.object = data.object;
        comment.user = data.user;
        comment.body = data.body;

        comment.save((error) => {
            if (error) return callback(error);
            return callback(null, comment.id);
        });
    });
};


export default Model("comment", schema, "comment");
