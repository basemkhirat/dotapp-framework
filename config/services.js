export default {
    google: {
        key: process.env.GOOGLE_KEY,
    },

    aws: {
        /**
         * your AWS access key ID
         */

        accessKeyId: process.env.AWS_KEY,

        /**
         * your AWS secret access key
         */

        secretAccessKey: process.env.AWS_SECRET,

        /**
         * the region to send service requests to.
         */

        region: process.env.AWS_REGION || "eu-west-1",
    },

    soundcloud: {
        key: process.env.SOUNDCLOUD_KEY,
    },
};
