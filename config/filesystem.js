import path from 'path';

export default {

    /**
     * Here you may specify the default filesystem disk that should be used.
     * The "local" storage is enabled by default.
     */

    storage: "local",

    /**
     * Here you may configure as many filesystem "disks" as you wish, and you
     * may even configure multiple disks of the same driver.
     */

    disks: {

        local: {
            driver: "local",
            path: path.join(process.cwd(), "public/uploads"),
            url: "http://localhost:3000/uploads"
        },

        s3: {
            driver: "s3",
            bucket: "my-bucket",
            region: "eu-west-1",
            key: "3rri324oij5i2j3uh24512",
            secret: "dhfa8f8sd6afd9f8asfds8afsdaf9da0gygas"
        }
    }
}
