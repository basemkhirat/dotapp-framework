export default function (data, callback) {

    this.render("mails/event_reserved", data, (error, html) => {
        if (error && callback) return callback(error);

        this.send({
            to: data.user.email,
            subject: "نور | تفاصيل الحجز",
            html: html
        }, (error, info) => {
            if (error && callback) return callback(error);
            if (callback) return callback(null, info);
        });

    });
}

