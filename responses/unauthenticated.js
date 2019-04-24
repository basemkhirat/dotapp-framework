export default function (data = "Not Authenticated", code = 401) {
    return this.res.error(data, code);
};
