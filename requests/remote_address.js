export default function () {
    return this.req.headers['x-real-ip'] ||
        this.req.headers['x-forwarded-for'] ||
        this.req.ip || this.req._remoteAddress ||
        (this.req.connection && this.req.connection.remoteAddress) ||
        undefined;
}
