export default function (data) {

    this.res.smessage = this.res.smessage || "Access Denied";

    return this.res.error(data, 403);
};
