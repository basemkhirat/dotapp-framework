import {Model, Schema} from 'dotapp/model';

let schema = Schema({

        name: {
            type: String,
        },

        status: {
            type: Number,
            default: 0
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
schema.index({name: "text"});

export default Model("role", schema, "role");
