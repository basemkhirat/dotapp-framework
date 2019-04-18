export default function param(name, defaultValue) {
    let params = this.params || {};
    let body = this.body || {};
    let query = this.query || {};

    if (null != params[name] && params.hasOwnProperty(name)) return params[name];
    if (null != body[name]) return body[name];
    if (null != query[name]) return query[name];

    return defaultValue;
};
