import Log from '~/services/log';
import Config from '~/services/config';

export default function (data) {

    let error = undefined;

    if (data instanceof Error) {
        error = data.stack.split('\n')
            .splice(0, 2)
            .map(line => {
                return line.trim();
            }).join(" ");

    } else {
        error = data;
    }

    Log.message(error, "error");

    if (!Config.get("app.debug")) {
        error = this.req.lang("messages.something_wrong");
    }

    this.res.smessage = this.res.smessage || this.req.lang("messages.server_error");

    return this.res.error(error, 500);
};
