export default function (data = []) {

    data = Array.isArray(data) ? data : [data];

    this.res.smessage = this.res.smessage || this.req.lang("messages.validation_error");

    return this.res.error(data, 422);
};
