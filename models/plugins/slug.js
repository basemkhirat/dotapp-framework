import slug from 'mongoose-url-slugs';

/**
 * generate a slug field from a given source field(s)
 * @param options
 * @returns {*}
 */
export default function (options) {

    return slug(options.source, {

        field: options.name,

        generator: function (slugText, separator) {
            slugText = slugText.toLowerCase().replace(/([^a-z0-9\-\_\u0600-\u06FF]+)/g, separator).replace(new RegExp(separator + '{2,}', 'g'), separator);
            if (slugText.substr(-1) === separator) {
                slugText = slugText.substr(0, slugText.length - 1);
            }
            return slugText;
        }
    });
}
