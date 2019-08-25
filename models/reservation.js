import {Model, Schema} from 'dotapp/model';

let schema = Schema({

    type: {
        type: String
    },

    tickets: {
        type: Number,
        default:  1
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    email: {
        type: String,
        lowercase: true
    },

    first_name: {
        type: String,
        default: ""
    },

    last_name: {
        type: String,
        default: ""
    },

    event: {
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
schema.index({tickets: 1});
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

    let Reservation = this;

    Reservation.where("type", data.type)
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

    let Reservation = this;

    Reservation.validate(data, (error) => {
        if (error) return callback(error);

        Reservation.exists(data, (error, exists) => {
            if (error) return callback(error);

            if (exists) {

                Reservation.findOneAndRemove(data, error => {
                    if (error) callback(error);
                    return callback(null, "unregistered");
                });

            } else {

                let reservation = new Reservation();

                reservation.type = data.type;
                reservation.object = data.object;
                reservation.user = data.user;

                reservation.save((error) => {
                    if (error) return callback(error);
                    return callback(null, "registered");
                });
            }
        });
    });
};

schema.statics.exists = function (data, callback) {

    let Reservation = this;

    Reservation.where("type", data.type)
        .where("object", data.object)
        .where("user", data.user)
        .countDocuments((error, total) => {
            if (error) return callback(error);
            callback(null, total > 0);
        });
};

schema.statics.delete = function (data, callback) {

    let Reservation = this;

    Reservation.validate(data, (error) => {
        if (error) return callback(error);
        Reservation.findOneAndRemove(data, error => {
            if (error) callback(error);
            return callback(null, "unregistered");
        });
    });
};


export default Model("reservation", schema, "reservation");
