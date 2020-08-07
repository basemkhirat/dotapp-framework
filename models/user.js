import { Model, Schema } from "dotapp/model";
import { Config, Auth } from "dotapp/services";

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
 * replace the raw password with encrypted one.
 */
schema.pre("save", async function (next) {
    if (
        this.provider == "local" &&
        (this.isModified("password") || this.isNew)
    ) {
        const hash = await Auth.generateHash(this.password);
        this.password = hash;
        next(null, this);
    } else {
        next(null, this);
    }
});

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
