export default function (data = "Access denied", code = 403) {
    return this.res.error(data, code);
};
