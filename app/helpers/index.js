import Config from '~/services/config';
import Log from '~/services/log';
import Router from '~/services/router';

/**
 * get configuration values by its names
 * @param name
 * @returns {*}
 * @private
 */
export const _config = function (name) {
    return Config.get(name);
};

/**
 * get locale values by its keys
 * @param phrase
 * @returns {*}
 * @private
 */
export const _lang = function (phrase) {
    return this.res.__(phrase);
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
