import mongoose from 'mongoose';
import moment from "moment";

mongoose.plugin(function (schema) {

    schema.set("versionKey", false);

    if(schema.options.timestamps === undefined){

        schema.set("timestamps", {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });

        schema.virtual("created").get(function () {
            return moment(this.created_at).fromNow();
        });

        schema.virtual("updated").get(function () {
            return moment(this.updated_at).fromNow();
        });
    }

});

mongoose.plugin(function (schema) {

    var toHide = ["_id", "created_at", "updated_at"];

    schema.eachPath(function (pathname, schemaType) {
        if (schemaType.options && schemaType.options.hide) {
            toHide.push(pathname);
        }
    });

    schema.options.toObject = schema.options.toObject || {};

    schema.options.toObject.transform = function (doc, ret) {
        // Loop over all fields to hide
        toHide.forEach(function (pathname) {
            // Break the path up by dots to find the actual
            // object to delete
            var sp = pathname.split('.');
            var obj = ret;
            for (var i = 0; i < sp.length - 1; ++i) {
                if (!obj) {
                    return;
                }
                obj = obj[sp[i]];
            }
            // Delete the actual field
            delete obj[sp[sp.length - 1]];
        });

        return ret;
    };
});

export const Mongoose = mongoose;
export const Schema = mongoose.Schema;

