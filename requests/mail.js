import path from 'path';

/**
 * send mail to an email
 * @param email
 * @param handler
 * @returns {boolean}
 */
export default function (email, handler, callback) {

    let handler_path = path.join(process.cwd(), "mails/" + handler + ".js");

    let handler_class = require(handler_path).default;

    let h = new handler_class(this.req);

    h.handle(email, callback);
};
