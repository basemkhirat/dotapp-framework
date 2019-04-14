export default function (data) {

    let response = {};

    response.data = data;
    response.status = 200;
    response.success = true;

    this.res.status(response.status);

    return this.res.json(response);
};
