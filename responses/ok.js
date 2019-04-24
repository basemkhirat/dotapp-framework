export default function (data, code = 200) {

    let response = {};

    response.data = data;
    response.status = code;
    response.success = true;
    response.debug = {
        user: this.req.user,
        token: this.req.token
    };

    this.res.status(response.status);

    return this.res.json(response);
};
