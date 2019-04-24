import fs from 'fs-extra';
import path from 'path';

export default class Local {

    constructor(storage) {
        this.storage = storage;
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
        let path = this.path(file);
        fs.unlink(path, callback)
    }

    /**
     * get file url
     * @param file
     * @returns {string}
     */
    url(file) {
        return this.storage.url + "/" + file;
    }

    /**
     * get file path
     * @param file
     * @returns {string}
     */
    path(file) {
        return this.storage.path + "/" + file;
    }

}
