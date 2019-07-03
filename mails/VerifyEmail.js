import Template from '~/services/mail/template';

export default class extends Template {

    handle(user, callback) {

        this.render("mails/auth/verify_email", {user}, (error, data) => {
            if (error && callback) return callback(error);

            this.send({
                to: user.email,
                subject: this.req.lang("auth.email_verification"),
                html: data
            }, (error, info) => {
                if (error && callback) return callback(error);
                if(callback) return callback(null, info);
            });

        });
    }
}
