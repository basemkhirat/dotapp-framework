import {Mongoose, Schema} from './model';
import Bcrypt from 'bcrypt';

let schema = Schema({

        email: {
            type: String
        },

        password: {
            type: String,
            hide: true
        },

        first_name: {
            type: String,
            default: ""
        },

        last_name: {
            type: String,
            default: ""
        },

        status: {
            type: Number,
            default: 0
        },

        lang: {
            type: String,
            default: 'en'
        },

        permissions: {
            type: [String],
            default: [],
            set: function (permissions) {
                permissions = Array.isArray(permissions) ? permissions : [permissions];
                let perms = [];
                permissions.forEach(permission => {
                    permission.split(",").forEach(item => {
                        item = item.trim();
                        if (perms.indexOf(item) < 0) {
                            perms.push(item);
                        }
                    });
                });

                return perms;
            }
        },

        role: {
            type: Schema.Types.ObjectId,
            ref: 'role'
        },

        photo: {
            type: Schema.Types.ObjectId,
            ref: 'media'
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

schema.index({permissions: 1});
schema.index({status: 1});
schema.index({photo: 1});
schema.index({role: 1});
schema.index({created_at: -1});
schema.index({updated_at: -1});

schema.index({
    email: "text",
    first_name: "text",
    last_name: "text",
    lang: "text"
});

/**
 * generate password salt
 */
schema.pre('save', function (next) {
    if (this.isModified("password") || this.isNew) {
        Bcrypt.genSalt(10, (error, salt) => {
            if (error) return next(error);
            Bcrypt.hash(this.password, salt, (error, hash) => {
                if (error) return next(error);
                this.password = hash;
                next(null, this);
            });
        });
    } else {
        next(null, this);
    }
});

/**
 * Compare raw and encrypted password
 * @param password
 * @param callback
 */
schema.methods.comparePassword = function (password, callback) {
    Bcrypt.compare(password, this.password, function (error, match) {
        if (error) return callback(error);
        if (match) {
            callback(null, true);
        } else {
            callback(error, false);
        }
    });
};

export default  Mongoose.model("user", schema, "user");


