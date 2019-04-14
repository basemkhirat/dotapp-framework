import mongoose from 'mongoose';

let schema = mongoose.Schema({

        name: {
            type: String,
            unique: true
        },

        permissions: {
            type: Array
        },

    }, {
        versionKey: false,
        timestamps: false
    }
);


module.exports = mongoose.model("role", schema, "role");
