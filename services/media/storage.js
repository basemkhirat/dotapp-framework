import Config from '~/services/config';

export default class Storage {

    /**
     * initialize default filesystem
     * @param storage
     */
    constructor(storage = false) {

        let filesystem = Config.get("filesystem");

        this.config = filesystem;

        storage = storage ? storage : filesystem.storage;

        this.disk = storage;

        let disk_object = require("~/services/media/drivers/" + storage).default;

        this.driver = new disk_object(filesystem.disks[storage]);
    }

    /**
     * save to filesystem
     * @param file
     * @param data
     * @param encoding
     * @param callback
     */
    save(file, data, encoding = 'binary', callback) {
        this.driver.save(file, data, encoding, callback);
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
        this.disk();
        return this.driver.url(file);
    }

    static disk(disk) {

        let x = new this(disk);

        return x.driver;
    }

}
