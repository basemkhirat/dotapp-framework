export default function (data) {

    this.res.smessage = this.res.smessage || this.req.lang("messages.page_not_found");

    return this.res.error(data, 404);
};
