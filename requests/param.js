export default function (name, defaultValue) {
    let params = this.req.params || {};
    let body = this.req.body || {};
    let query = this.req.query || {};

    if (null != params[name] && params.hasOwnProperty(name)) return params[name];
    if (null != body[name]) return body[name];
    if (null != query[name]) return query[name];

    return defaultValue;
};
