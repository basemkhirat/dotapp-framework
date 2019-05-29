import mailer from 'nodemailer';
import Config from '~/services/config';
import AWS from '~/services/aws';

export default new class {

    constructor() {

        this.config = Config.get("mail");

        let transport_options = this.config.drivers[this.config.default];

        if (this.config.default === 'ses') {
            transport_options.SES = new AWS.SES(this.config.drivers[this.config.default])
        }

        this.mailer = mailer.createTransport(transport_options);
    }

    /**
     * send mail
     * @param data
     * @param callback
     */
    send(data, callback) {

        if (!("from" in data)) {
            data.from = this.config.from;
        }

        this.mailer.sendMail(data, (error, info) => {
            if (error && callback) return callback(error, info);
            if (callback) callback(null, info);
        });
    }

    /**
     * check connectivity
     * @returns {*}
     */
    verify() {
        return this.mailer.verify;
    }
}




