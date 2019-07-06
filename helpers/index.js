import Config from '~/services/config';
import Log from '~/services/log';
import Router from '~/services/router';

/**
 * get configuration values by its names
 * @param name
 * @param defaultValue
 * @returns {*}
 * @private
 */
export const _config = function (name, defaultValue = null) {
    return Config.get(name, defaultValue);
};

/**
 * log application errors
 * @param message
 * @param level
 * @private
 */
export const _log = function (message, level = "error") {
    Log.message(message, level);
};

/**
 * log application info
 * @param message
 * @param level
 * @private
 */
export const _info = function (message, level = "info") {
    Log.message(message, level);
};

/**
 * get storage path

 * @private
 */
export const _storage_path = function (path = false) {
    let root_path = process.cwd() + "/storage";
    return path ? root_path + "/" + path : root_path;
};

/**
 * get uploads path
 * @param path
 * @private
 */
export const _uploads_path = function (path = false) {
    let root_path = process.cwd() + "/public/uploads";
    return path ? root_path + "/" + path : root_path;
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

export const _url = function (path, params = {}) {
    let url = Config.get("app.url");
    return path ? url + "/" + path : url;
};
