export default function (data) {

    this.res.smessage = this.res.smessage || "Bad Request";

    return this.res.error(data, 400);
};
