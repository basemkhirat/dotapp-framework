export default function (data = []) {

    data = Array.isArray(data) ? data : [data];

    this.res.smessage = this.res.smessage || "Validation Error";

    return this.res.error(data, 422);
};
