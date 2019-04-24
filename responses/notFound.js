export default function (data = "Page not found", code = 404) {
    return this.res.error(data, code);
};
