import Config from '~/services/config';

export default class Index {

    /**
     * initialize default storage
     * @param storage
     */

    constructor(storage = false) {

        let config = Config.get("storage");

        this.disk = storage;

        let disk_params = storage in config.disks ? config.disks[storage] : config.disks[config.default];

        let driver_module = require("~/services/storage/drivers/" + disk_params.driver);

        this.driver = new driver_module.default(disk_params);
    }

    /**
     * read a file
     * @param file
     * @param encoding
     * @param callback
     */

    read(file, encoding = null, callback) {

        if(typeof encoding === 'function'){
            callback = encoding;
            encoding = null;
        }

        this.driver.read(file, encoding, (error, data) => {
            if (error && callback) return callback("cannot read this file");
            if (callback) return callback(null, data);
        });
    }

    /**
     * save a file
     * @param file
     * @param data
     * @param encoding
     * @param callback
     */

    save(file, data, encoding = "utf8", callback) {

        if(typeof encoding === 'function'){
            callback = encoding;
            encoding = "utf8";
        }

        this.driver.save(file, data, encoding, error => {
            if (error && callback) return callback("error when saving file to storage");
            if (callback) return callback(null, file);
        });
    }

    /**
     * delete a file
     * @param file
     * @param callback
     */

    delete(file, callback) {
        this.driver.delete(file, error => {
            if (error && callback) return callback("File is not exist");
            if (callback) return callback(null, file);
        });
    }

    /**
     * check file exists
     * @param file
     * @param callback
     */

    exists(file, callback) {
        this.driver.exists(file, error => {
            if (error && callback) return callback("File is not exist");
            if (callback) return callback(null, true);
        });
    }

    /**
     * get absolute file path
     * @param file
     * @returns {*}
     */

    path(file) {
        return this.driver.path(file);
    }

    /**
     * get file url
     * @param file
     * @returns {*}
     */

    url(file) {
        return this.driver.url(file);
    }

    /**
     * set storage disk
     * @param driver
     * @returns {Index}
     */
    static disk(disk) {
        return new Index(disk);
    }
}
