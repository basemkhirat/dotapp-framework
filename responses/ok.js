export default function (data) {

    let response = {};

    response.message = this.res.smessage || "OK";
    response.status = 200;
    response.success = true;
    response.data = data || undefined;

    if (process.env.NODE_ENV !== 'production') {
        response.debug = {
            env: process.env.NODE_ENV,
            user: this.req.user,
            token: this.req.token
        };
    }

    this.res.status(response.status);

    return this.res.json(response);
};
