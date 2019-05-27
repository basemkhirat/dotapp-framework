import fs from 'fs-extra';
import path from 'path';

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

        let directory = this.path(path.dirname(file));

        fs.ensureDir(directory, error => {
            if (error) return callback(error);

            fs.writeFile(this.path(file), data, encoding, error => {
                if (error) return callback(error);
                callback(error, this.path(file));
            });
        });
    }

    /**
     * delete file
     * @param file
     * @param callback
     */

    delete(file, callback) {
        fs.unlink(this.path(file), callback)
    }

    /**
     * check file exists
     * @param file
     * @param callback
     */

    exists(file, callback) {
        fs.access(this.path(file), fs.F_OK, callback);
    }

    /**
     * get file url
     * @param file
     * @returns {string}
     */

    url(file) {
        return file ? this.config.url + "/" + file : this.config.url;
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
