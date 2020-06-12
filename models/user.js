import { Model, Schema } from "dotapp/model";
import Bcrypt from "bcrypt";
import {Config} from "dotapp/services";


let schema = Schema(
    {
        email: {
            type: String,
            lowercase: true,
        },

        password: {
            type: String,
            hide: true,
        },

        first_name: {
            type: String,
            default: "",
        },

        last_name: {
            type: String,
            default: "",
        },

        status: {
            type: Number,
            default: 1,
        },

        lang: {
            type: String,
            default: Config.get("i18n.defaultLocale"),
        },

        role: {
            type: Schema.Types.ObjectId,
            ref: "role"
        },

        photo: {
            type: Schema.Types.ObjectId,
            ref: "media",
        },

        password_token: {
            type: String,
        },

        password_token_expiration: {
            type: Number,
        },

        email_verification_code: {
            type: String,
        },

        email_verification_code_expiration: {
            type: Number,
        },

        provider: {
            type: String,
            default: "local",
        },

        provider_id: {
            type: String,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

schema.index({ status: 1 });
schema.index({ photo: 1 });
schema.index({ role: 1 });
schema.index({ password_token: 1 });
schema.index({ password_token_expiration: 1 });
schema.index({ created_at: -1 });
schema.index({ updated_at: -1 });

schema.index({
    email: "text",
    first_name: "text",
    last_name: "text",
    lang: "text",
});

/**
 * generate password salt
 */
schema.pre("save", function (next) {
    if (
        this.provider == "local" &&
        (this.isModified("password") || this.isNew)
    ) {
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

// schema.pre("save", function (next) {
//     if (this.photo_payload) {
//         Resource.create(this.photo_payload, (error, media) => {
//             if (error) return next(error);
//             media.save((error, media) => {
//                 if (error) next(error);
//                 this.photo = media.id;
//                 this.photo_payload = undefined;
//                 next(null, this);
//             });
//         });
//     } else {
//         this.photo = null;
//         next(null, this);
//     }
// });

/**
 * Compare raw and encrypted password
 * @param password
 * @return Promise
 */
schema.methods.comparePassword = function (password) {
    return new Promise((resolve, reject) => {
        Bcrypt.compare(String(password), this.password, function (
            error,
            match
        ) {
            if (error) return reject(error);
            if (match) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

schema.virtual("name").get(function () {
    return this.first_name + " " + this.last_name;
});

schema.methods.getRole = function (attribute = null, callback) {
    let role = this.role;

    if (!role) {
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

export default Model("user", schema, "user");
