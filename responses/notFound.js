export default function (data) {

    this.res.smessage = this.res.smessage || "Page Not Found";

    return this.res.error(data, 404);
};
