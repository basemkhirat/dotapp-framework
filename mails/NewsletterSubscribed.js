export default function (email, callback) {

    this.render("mails/newsletter/subscribed", {email}, (error, html) => {
        if (error && callback) return callback(error);

        this.send({
            to: email,
            subject: this.req.lang("subscription.subscription"),
            html: html
        }, (error, info) => {
            if (error && callback) return callback(error);
            if (callback) return callback(null, info);
        });

    });
}
