import fs from 'fs-extra';
import aws from 'aws-sdk';
import path from 'path';
import Config from '~/services/config';

export default class {

    constructor(config) {
        this.config = config;
    }

    /**
     * save file
     * @param file
     * @param data
     * @param encoding
     * @param callback
     */

    save(file, data, encoding, callback) {

        aws.config.update(Config.get("aws"));

        let s3 = new aws.S3();

        let params = {
            Bucket: this.config.bucket,
            Body: data,
            Key: file,
            ACL: 'public-read'
        };

        s3.upload(params, function (error, data) {
            if (error) return callback(error);

            if (data) {
                callback(error, data);
            }
        });
    }

    /**
     * delete file
     * @param file
     * @param callback
     */

    delete(file, callback) {

        aws.config.update(Config.get("aws"));

        let s3 = new aws.S3();

        let params = {
            Bucket: this.config.bucket,
            Key: file,
        };

        s3.deleteObject(params, (error, data) => {
            if (error) return callback(error);

            callback(null, data);
        });
    }

    /**
     * check file exists
     * @param file
     * @param callback
     */

    exists(file, callback) {

        aws.config.update(Config.get("aws"));

        let s3 = new aws.S3();

        let params = {
            Bucket: this.config.bucket,
            Key: file,
        };

        s3.waitFor('objectExists', params, (error, data) => {
            if (error) return callback(error);

            callback(null, data);
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
        return file ? this.config.path + "/" + file : this.config.path;
    }
}
