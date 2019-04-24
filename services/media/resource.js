import mime from "mime-types";
import Config from '~/services/config';
import Storage from '~/services/media/storage';
import url from "url";
import path from "path";
import fs from "fs";

export default class Resource {

    /**
     * the file object
     * @type {{}}
     */
    file = {};

    constructor(payload, storage = new Storage()) {
        this.payload = payload;
        this.storage = storage;
        let payload_class = require("~/services/media/payloads/" + this.getType()).default;
        this.payload_object = new payload_class(payload);
        this.media = Config.get('media');
    }

    /**
     * store the resource
     * @param callback
     */
    store(callback) {

        this.payload_object.store.call(this, (error, file) => {

            if (error) return callback(error);

            let handler_path = path.join(process.cwd(), "services/media/handlers/" + file.type + ".js");

            if (fs.existsSync(handler_path)) {
                let handler = require(handler_path).default;
                let handler_object = new handler(this);
                return handler_object.handle(callback);
            } else {
                return callback(null, this);
            }
        });
    }

    /**
     * set file type
     * @param mime_type
     */
    setFileType(mime_type) {
        this.file.mime_type = mime_type;
        this.file.type = mime_type.split("/")[0];
        let extension = mime.extension(mime_type);
        this.file.extension = extension === "jpeg" ? "jpg" : extension;
    }


    /**
     * set resource provider
     * @param name
     */
    setProvider(name = 'local'){
        this.provider = name;
    }

    /**
     * set file size
     * @param size
     */
    setFileSize(size) {
        this.file.size = size;
    }

    /**
     * generate timestamp filename
     * @param callback
     */
    generateFileName(callback) {

        let date = new Date();

        let directory = date.getFullYear() + "/" + (date.getMonth() + 1);
        this.file.directory = this.storage.path(directory);
        this.file.relative_directory = directory;
        this.file.name = Date.now();
        this.file.file = this.file.name + "." + this.file.extension;
        this.file.path = this.file.directory + "/" + this.file.file;
        this.file.url = this.storage.url(directory + "/" + this.file.file);

        callback(null, directory + "/" + this.file.name + "." + this.file.extension);
    }

    /**
     * validate file
     * @param callback
     * @returns {*}
     */
    validate(callback) {

        if (this.file.size > this.media.max_file_size) {
            return callback("File size is too high");
        }

        if (this.media.allowed_file_types.indexOf(this.file.extension) === -1) {
            return callback("File type is not allowed");
        }

        return callback(null);
    }

    /**
     * get resource type
     * @returns {string|boolean}
     */
    getType() {

        let protocol = url.parse(this.payload).protocol;

        if (protocol === "data:") {
            return "data";
        } else if (protocol === "http:" || protocol === "https:") {
            return "link";
        }

        return false;
    }
}
