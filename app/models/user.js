import { Mongoose, Schema } from './model';
import bcrypt from 'bcrypt';

let schema = Schema({
        username: {type: String, unique: false},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        first_name: {type: String, required: false},
        score: {type: Number, default: 0},
        lang: {type: String, default: 'en'},
        permissions: {type: Array},
        role: {type: Schema.Types.ObjectId, ref: 'role'},
    }, {
        versionKey: false,
        timestamps: true
    }
);

schema.pre('save', function (next) {
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) return next(error);
            bcrypt.hash(this.password, salt, (error, hash) => {
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
    bcrypt.compare(password, this.password, function (error, match) {
        if (error) callback(error);
        if (match) {
            callback(null, true);
        } else {
            callback(error, false);
        }
    });
});

export default Mongoose.model("user", schema, "user");
