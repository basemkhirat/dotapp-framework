export default function (data = "Bad request", code = 400) {
    return this.res.error(data, code);
};
