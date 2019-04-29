import {Mongoose, Schema} from './model';
import Bcrypt from 'bcrypt';

let schema = Schema({

        email: {
            type: String,
            index: true
        },

        password: {
            type: String,
            hide: true
        },

        first_name: {
            type: String,
            default: "",
            index: true
        },

        last_name: {
            type: String,
            default: "",
            index: true
        },

        status: {
            type: Number,
            default: 0,
            index: true
        },

        lang: {
            type: String,
            default: 'en',
            index: true
        },

        permissions: {
            type: Array,
            default: []
        },

        role: {
            type: Schema.Types.ObjectId,
            ref: 'role',
            index: true
        },

        photo: {
            type: Schema.Types.ObjectId,
            ref: 'media',
            index: true
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

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
schema.method('comparePassword', function (password, callback) {
    Bcrypt.compare(password, this.password, function (error, match) {
        if (error) callback(error);
        if (match) {
            callback(null, true);
        } else {
            callback(error, false);
        }
    });
});


export default Mongoose.model("user", schema, "user");
