export default function (data, code = 500) {

    let error = new Error();

    error.data = data;
    error.status = code;
    error.success = false;
    error.debug = {
        user: this.req.user,
        token: this.req.token
    };

    this.res.status(error.status);

    return this.res.json(error);
};
