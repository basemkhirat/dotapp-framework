import Config from '~/services/config';

export default function (e, code = 500) {

    let error = new Error();

    error.message = this.res.smessage;
    error.errors = Array.isArray(e) ? e : [e ? e : error.message];
    error.status = code;
    error.success = false;

    if (Config.get("app.debug")) {
        error.debug = {
            env: process.env.NODE_ENV,
            user: this.req.user,
            token: this.req.token
        };
    }

    this.res.status(error.status);

    return this.res.json(error);
};
