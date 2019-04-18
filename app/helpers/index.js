import Config from '~/services/config';
import Log from '~/services/log';
import Router from '~/services/router';

/**
 * get configuration values by its names
 * @param name
 * @returns {*}
 * @private
 */
export const _config = function (name, defaultValue = null) {
    return Config.get(name, defaultValue);
};

/**
 * get locale values by its keys
 * @param phrase
 * @returns {*}
 * @private
 */
export const _lang = function (value, variables = {}, locale = this.res.getLocale()) {

    let phrase_parts = value.split(".");

    if (phrase_parts.length === 1) return phrase_parts[0];

    let response = this.res.__({phrase: phrase_parts[1], locale: locale + "/" + phrase_parts[0]});

    let result = phrase_parts.splice(2).reduce((response, key) => {
        return typeof response == "object" && key in response ? response[key] : key;
    }, response);

    for (let variable in variables) {
        result = result.replace(":" + variable, variables[variable]);
    }

    return result;
};

/**
 * log application messages
 * @param message
 * @param level
 * @private
 */
export const _log = function (message, level = "error") {
    Log.message(message, level);
};

/**
 * get base url
 * @param path
 * @returns {string}
 * @private
 */
export const _url = function (path) {
    let base_url = this.req.protocol + '://' + this.req.get('host');
    return path ? base_url + "/" + path : base_url;
};

/**
 * get route by name
 * @param name
 * @param params
 * @returns {*}
 * @private
 */
export const _route = function (name, params = {}) {
    return Router.name(name, params);
};
