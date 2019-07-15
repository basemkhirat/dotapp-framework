import mongoose from 'mongoose';
import moment from "moment";
import mongooseSlugUpdater from 'mongoose-slug-updater';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseIntl from 'mongoose-intl';
import Config from '~/services/config';

mongoose.plugin(mongooseAutoPopulate);
mongoose.plugin(mongooseSlugUpdater);
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: Config.get("i18n.defaultLocale") });

mongoose.plugin(function (schema) {

    schema.set("versionKey", false);

    schema.virtual("created").get(function () {
        return this.created_at ? moment(this.created_at).fromNow() : undefined;
    });

    schema.virtual("updated").get(function () {
        return this.updated_at ? moment(this.updated_at).fromNow() : undefined;
    });

    schema.query.execWithCount = function (callback) {

        return this.exec((error, docs) => {
            if (error) return callback(error);

            this.limit(undefined).skip(undefined).sort(undefined);

            this.countDocuments((error, total) => {
                if (error) return callback(error);
                callback(null, {
                    total: total,
                    docs: docs
                })
            });
        });
    };

    /**
     * page query scope
     * @param page
     * @param limit
     * @returns {*}
     */
    schema.query.page = function (page = 1, limit = 10) {

        limit = parseInt(limit), page = parseInt(page);

        limit = limit < 50 ? limit : 50;

        return this.limit(limit).skip((page - 1) * limit);
    };

    /**
     * order query scope
     * @param field
     * @param direction
     * @returns {*}
     */
    schema.query.order = function (field = "_id", direction = "desc") {
        return this.sort({[field]: direction === "desc" ? -1 : 1});
    };
});

mongoose.plugin(function (schema) {

    var toHide = [
        "_id",
        "created_at",
        "updated_at"
    ];

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

