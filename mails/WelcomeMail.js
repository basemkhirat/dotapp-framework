import Template from '~/services/mail/template';

export default class extends Template {

    handle(email, callback) {

        this.render("hello", {name: "Express"}, (error, data) => {
            if (error && callback) return callback(error);

            this.send({
                to: email,
                subject: "Welcome Mail",
                html: data
            }, (error, info) => {
                if (error && callback) return callback(error);
                return callback(null, info);
            });

        });

    }

}
