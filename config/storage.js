import path from 'path';

export default {

    /**
     * Here you may specify the default filesystem disk that should be used.
     * The "local" storage is enabled by default.
     */

    default: "public",

    /**
     * Here you may configure as many filesystem "disks" as you wish, and you
     * may even configure multiple disks of the same driver.
     */

    disks: {

        public: {
            driver: "local",
            path: path.join(process.cwd(), "public"),
            url: process.env.APP_URL
        },

        uploads: {
            driver: "local",
            path: path.join(process.cwd(), "public/uploads"),
            url: process.env.APP_URL + "/uploads"
        },

        s3: {
            driver: "s3",
            bucket: "my-bucket",
            region: "eu-west-1",
            key: process.env.AWS_KEY,
            secret: process.env.AWS_SECRET
        }
    }
}
