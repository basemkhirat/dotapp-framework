/**
 * check if request parameter exist
 * @param name
 * @returns {boolean}
 */
export default function(name) {
    let params = this.req.params || {};
    let body = this.req.body || {};
    let query = this.req.query || {};

    if (null != params[name] && params.hasOwnProperty(name)) return true;
    if (null != body[name]) return true;
    if (null != query[name]) return true;

    return false;
};
