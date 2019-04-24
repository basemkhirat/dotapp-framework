export default function (name) {

    let value = this.req.param(name);

    if (Array.isArray(value)) {
        return !!value.filter(key => key !== "" && key !== undefined).length;
    }

    return value !== "" && value !== undefined;
};
