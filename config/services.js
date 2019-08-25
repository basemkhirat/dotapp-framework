export default {

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

        region: process.env.AWS_REGION || "eu-west-1"
    },

    youtube: {
        key: process.env.YOUTUBE_KEY
    },

    soundcloud: {
        key: process.env.SOUNDCLOUD_KEY
    },


    google: {

    }

}
