/**
 * get remote remote address
 * @returns {*|string|Connection|undefined}
 */
export default function () {

    let ip = this.req.headers['x-real-ip'] ||
        this.req.headers['x-forwarded-for'] ||
        this.req.ip ||
        this.req._remoteAddress ||
        (this.req.connection && this.req.connection.remoteAddress) ||
        undefined;

    if (ip && ip.substr(0, 7) === "::ffff:") {
        ip = ip.substr(7);
    }

    return ip;
}
