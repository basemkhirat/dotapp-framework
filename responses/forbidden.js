/**
 * send forbidden response
 * @param data
 * @returns {*}
 */
export default function (data) {
    this.res.smessage = this.res.smessage || this.req.lang("messages.forbidden");
    return this.res.error(data, 403);
};
