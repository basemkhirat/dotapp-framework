export default function (data = [], code = 422) {

    if (data.length === 0) {
        return this.res.error("No validation errors attached to response");
    }

    data = Array.isArray(data) ? data : [data];
    return this.res.error(data, code);
};
