import {Mongoose, Schema} from './model';

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

    return callback(null, true);
};

schema.statics.get = function (data, callback) {

    let Like = this;

    Like.where("type", data.type)
        .where("object", data.object)
        .populate("user").populate("object")
        .execWithCount((error, result) => {

            if (error) return callback(error);

            return callback(null, {
                total: result.total,
                docs: result.docs
            });
        });
};

schema.statics.toggle = function (data, callback) {

    let Like = this;

    Like.validate(data, (error) => {
        if (error) return callback(error);

        Like.exists(data, (error, exists) => {
            if (error) return callback(error);

            if (exists) {

                Like.findOneAndRemove(data, error => {
                    if (error) callback(error);
                    return callback(null, "unliked");
                });

            } else {

                let like = new Like();

                like.type = data.type;
                like.object = data.object;
                like.user = data.user;

                like.save((error) => {
                    if (error) return callback(error);
                    return callback(null, "liked");
                });
            }
        });
    });
};

schema.statics.exists = function (data, callback) {

    let Like = this;

    Like.where("type", data.type)
        .where("object", data.object)
        .where("user", data.user)
        .countDocuments((error, total) => {
            if (error) return callback(error);
            callback(null, total > 0);
        });
};

schema.statics.delete = function (data, callback) {

    let Like = this;

    Like.validate(data, (error) => {
        if (error) return callback(error);
        Like.findOneAndRemove(data, error => {
            if (error) callback(error);
            return callback(null, "unliked");
        });
    });
};


export default Mongoose.model("like", schema, "like");
