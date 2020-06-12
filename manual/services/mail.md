# Mail Service

A rich service provides an easy way to send mails.

## Configuration

`config/mail.js` is the configuration file where you can modify mail drivers and from address details.

### Allowed drivers:
- stream: sent mails are only displayed in server log.
- sendmail: mail is sent using server sendmail.
- smtp: mail is sent using smtp account.
- ses: mail is sent using aws ses account.


``` javascript
export default {

    /**
     * Default mail driver
     * Supported: stream, sendmail, smtp, ses.
     */

    default: process.env.MAIL_DRIVER || "stream",

    /**
     * Sender mail
     */

    from: "DOT APP <example@dotapp.com>",

    /**
     * Mail drivers
     */

    drivers: {

        /**
         * write email to console
         * for development
         */

        stream: {
            newline: 'unix',
            buffer: true,
            jsonTransport: true
        },

        /**
         * server sendmail service
         */

        sendmail: {
            sendmail: true,
            newline: 'unix',
            path: process.env.MAIL_SENDMAIL_PATH || '/usr/sbin/sendmail'
        },

        /**
         * smtp account
         */

        smtp: {
            host: process.env.MAIL_HOST || '127.0.0.1',
            port: process.env.MAIL_PORT || 25,
            secure: process.env.MAIL_SECURE || true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            },
            pool: true
        },

        /**
         * AWS SES account
         */

        ses: {
            sendingRate: 1
        }
    }
}

```

## Usage

You can send mail in promise-based or callback way.

``` javascript

import {Mail} from "dotapp/services";

 try {

    await Mail.send({
        to: "example@gmail.com",
        subject: "Message Subject",
        text: "Hi. This is the body",
    });

}catch(error) {
    return res.serverError(error);
}

```

You can send HTML body also


``` javascript

import {Mail} from "dotapp/services";

 try {

    await Mail.send({
        to: "example@gmail.com",
        subject: "Message Subject",
        html: await req.view("mails/email_verified", { username: "john_doe" }),
    });

}catch(error) {
    return res.serverError(error);
}

```

