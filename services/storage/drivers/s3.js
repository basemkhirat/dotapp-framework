import AWS from '~/services/aws';

export default class {

    constructor(config) {
        this.config = config;
    }

    /**
     * read a file
     * @param file
     * @param encoding
     * @param callback
     */

    read(file, encoding, callback) {

        let s3 = new AWS.S3();

        let params = {
            Bucket: this.config.bucket,
            Key: file
        };

        s3.getObject(params, (error, data) => {
            if (error) return callback(error);

            let body = data.Body;

            if (encoding) {
                body = body.toString(encoding);
            }

            callback(error, body);
        });
    }

    /**
     * save file
     * @param file
     * @param data
     * @param encoding
     * @param callback
     */

    save(file, data, encoding, callback) {

        let s3 = new AWS.S3();

        let params = {
            Bucket: this.config.bucket,
            Body: Buffer.from(data, encoding),
            Key: file,
            ACL: 'public-read'
        };

        s3.upload(params, error => {
            if (error) return callback(error);

            callback(error, file);
        });
    }

    /**
     * delete file
     * @param file
     * @param callback
     */

    delete(file, callback) {

        let s3 = new AWS.S3();

        let params = {
            Bucket: this.config.bucket,
            Key: file,
        };

        s3.deleteObject(params, error => {
            if (error) return callback(error);

            callback(null, file);
        });
    }

    /**
     * check file exists
     * @param file
     * @param callback
     */

    exists(file, callback) {

        let s3 = new AWS.S3();

        let params = {
            Bucket: this.config.bucket,
            Key: file,
        };

        s3.headObject(params, (error, exists) => {
            if (error) return callback(error);

            callback(null, exists);
        });
    }

    /**
     * get file url
     * @param file
     * @returns {string}
     */

    url(file) {

        let baseURL = "https://" + this.config.bucket + ".s3." + this.config.region + ".amazonaws.com";

        return file ? baseURL + "/" + file : baseURL;
    }

    /**
     * get file path
     * @param file
     * @returns {string}
     */

    path(file) {

        let basePath = "s3://" + this.config.bucket;

        return file ? basePath + "/" + file : basePath;
    }
}
