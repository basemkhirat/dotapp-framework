export default function (data) {

    let error = new Error();

    error.message = "Forbidden";
    error.status = 401;
    error.success = false;

    if (data instanceof Error) {
        error.message = data.message;
    } else if (data) {
        error.message = data
    }

    this.res.status(error.status);

    return this.res.json(error);
};
