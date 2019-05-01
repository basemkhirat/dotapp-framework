export default function (data) {

    this.res.smessage = this.res.smessage || this.req.lang("messages.not_authenticated");

    return this.res.error(data, 401);
};
