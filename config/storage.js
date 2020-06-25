import path from "path";

export default {
    /**
     * Here you may specify the default filesystem disk that should be used.
     * The 'local' storage is enabled by default.
     */

    default: "uploads",

    /**
     * Here you may configure as many filesystem 'disks' as you wish, and you
     * may even configure multiple disks of the same driver.
     */

    disks: {
        public: {
            driver: "local",
            path: path.join(process.cwd(), "public"),
            url: process.env.APP_URL,
        },

        /**
         * public upload storage
         * used for public file access
         */

        uploads: {
            driver: "local",
            path: path.join(process.cwd(), "public/uploads"),
            url: process.env.APP_URL + "/uploads",
        },

        /**
         * temporary storage
         * used for private file access
         */

        temp: {
            driver: "local",
            path: path.join(process.cwd(), "storage/temp"),
            url: false,
        },

        /**
         * s3 cloud storage
         */

        s3: {
            driver: "s3",
            bucket: "cms-js",
            region: "eu-west-1",
        },
    },
};
