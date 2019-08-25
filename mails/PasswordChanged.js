export default function (user, callback) {

    this.render("mails/auth/password_changed", {user}, (error, html) => {
        if (error && callback) return callback(error);

        this.send({
            to: user.email,
            subject: this.req.lang("auth.password_change"),
            html: html
        }, (error, info) => {
            if (error && callback) return callback(error);
            if (callback) return callback(null, info);
        });

    });
}

