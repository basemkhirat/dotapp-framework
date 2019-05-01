export default function (data) {

    this.res.smessage = this.res.smessage || this.req.lang("messages.bad_request");

    return this.res.error(data, 400);
};
