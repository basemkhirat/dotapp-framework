import Config from '~/services/config';

export default function (data) {

    let response = {};

    response.message = this.res.smessage || this.req.lang("messages.ok");
    response.status = 200;
    response.success = true;
    response.data = data || undefined;

    if (Config.get("app.debug")) {
        response.debug = {
            env: process.env.NODE_ENV,
            user: this.req.user,
            token: this.req.token
        };
    }

    this.res.status(response.status);

    return this.res.json(response);
};
