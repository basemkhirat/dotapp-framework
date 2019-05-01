export default function (data) {

    this.res.smessage = this.res.smessage || "Not Authenticated";

    return this.res.error(data, 401);
};
