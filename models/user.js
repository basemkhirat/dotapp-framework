import {Mongoose, Schema} from './model';
import Bcrypt from 'bcrypt';

let schema = Schema({

        email: {
            type: String,
            lowercase: true
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

        role: {
            type: Schema.Types.ObjectId,
            ref: 'role',
            autopopulate: true
        },

        photo: {
            type: Schema.Types.ObjectId,
            ref: 'media'
        },

        password_token: {
            type: String
        },

        password_token_expiration: {
            type: Number
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

schema.index({status: 1});
schema.index({photo: 1});
schema.index({role: 1});
schema.index({password_token: 1});
schema.index({password_token_expiration: 1});
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
    Bcrypt.compare(String(password), this.password, function (error, match) {
        if (error) return callback(error);
        if (match) {
            callback(null, true);
        } else {
            callback(error, false);
        }
    });
};

schema.methods.getRole = function (attribute = null, callback) {

    let role = this.role;

    if(!role) {
        return null;
    }

    if (attribute) {

        if (attribute in role) {
            return role[attribute];
        } else {
            return null;
        }

    } else {
        return role;
    }
};

schema.methods.hasRole = function (name = false, callback) {

    if (!name) {
        return false;
    }

    if (this.getRole("name") === name) {
        return true;
    }

    return false;
};

export default Mongoose.model("user", schema, "user");


