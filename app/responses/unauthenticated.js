export default function (data, code = 401) {

    let error = new Error();

    error.message = "Not Authenticated";
    error.status = code;
    error.success = false;

    if (data instanceof Error) {
        error.message = data.message;
    } else if (data) {
        error.message = data
    }

    error.debug = {
        user: this.req.user,
        token: this.req.token
    };

    this.res.status(error.status);

    return this.res.json(error);
};
