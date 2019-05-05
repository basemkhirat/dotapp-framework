export default function () {
    return this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress;
}
