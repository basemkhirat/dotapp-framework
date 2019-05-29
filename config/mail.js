export default {

    /**
     * Default mail driver
     * Supported: stream, sendmail, smtp, ses.
     */

    default: process.env.MAIL_DRIVER || "stream",

    /**
     * Sender mail
     */

    from: "Sender <sender@example.com>",

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
            path: '/usr/sbin/sendmail'
        },

        /**
         * smtp account
         */

        smtp: {
            host: process.env.MAIL_HOST,
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
