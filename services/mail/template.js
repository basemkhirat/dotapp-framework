import Mail from '~/services/mail';
import Config from '~/services/config';
import ejs from 'ejs';
import path from 'path';

export default class {

    constructor(req) {
        this.req = req;
    }

    /**
     * send an email
     * @param data
     * @param callback
     * @returns {*}
     */
    send(data, callback) {
        return Mail.send(data, callback);
    }

    /**
     * render ejs template
     * @param view
     * @param payload
     * @param callback
     * @returns {*|undefined}
     */
    render(view, payload = {}, callback) {

        if (typeof payload === 'function') {
            callback = payload;
            payload = {};
        }

        payload.req = this.req;

        let view_path = path.join(process.cwd(), Config.get("app.views") + "/" + view + ".ejs");

        return ejs.renderFile(view_path, payload, (error, data) => {
            if (error) callback(error);

            callback(null, data);
        });
    }
}
