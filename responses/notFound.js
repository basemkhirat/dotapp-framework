export default function (data) {

    this.res.smessage = this.res.smessage || this.req.lang("messages.not_found");

    return this.res.error(data, 404);
};
