export default function (data, code = 200) {

    let response = {};

    if(typeof data == 'object' && data.constructor.name === 'model'){
        data = data.toObject({ virtuals: true, getters: true });
    }

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
