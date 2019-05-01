import I18n from 'i18n';

/**
 * get locale values by its keys
 * @param value
 * @param variables
 * @param local
 * @returns {*}
 * @private
 */
export default function (value, variables = {}, locale) {

    locale = locale || this.req.language;

    let phrase_parts = value.split(".");

    if (phrase_parts.length === 1) return phrase_parts[0];

    let response = I18n.__({phrase: phrase_parts[1], locale: locale + "/" + phrase_parts[0]});

    let result = phrase_parts.splice(2).reduce((response, key) => {
        return typeof response == "object" && key in response ? response[key] : key;
    }, response);

    for (let variable in variables) {
        result = result.replace(":" + variable, variables[variable]);
    }

    return result;
};
