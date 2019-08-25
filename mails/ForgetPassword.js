export default function (user, callback) {

    this.render("mails/auth/forget_password", {user}, (error, html) => {
        if (error && callback) return callback(error);

        this.send({
            to: user.email,
            subject: this.req.lang("auth.password_reset_verification"),
            html: html
        }, (error, info) => {
            if (error && callback) return callback(error);
            if (callback) return callback(null, info);
        });

    });
}

