import mime from "mime-types";
import Config from '~/services/config';
import Storage from '~/services/storage';
import url from "url";
import path from "path";
import fs from "fs";

export default class Resource {

    /**
     * the file object
     * @type {{}}
     */
    file = {};

    constructor(payload) {
        this.payload = payload;
    }

    /**
     * store the resource
     * @param callback
     */
    store(callback) {

        this.storage = Storage.disk("uploads");
        let payload_class = require("~/services/media/payloads/" + this.getType()).default;
        this.payload_object = new payload_class(this.payload);
        this.media = Config.get('media');

        this.payload_object.handle.call(this, error => {

            if (error) return callback(error);

            /**
             * Handlers are function executed after payload processing to make
             * trigger operations based on file provider and type setted in payload class.
             *
             * Takes payload and return a saved resource.
             */

            this.getHandler(handler_path => {
                let handler = require(handler_path).default;
                let handler_object = new handler(this);
                return handler_object.handle(callback);
            });
        });
    }

    /**
     * get resource handler path
     * @returns {*}
     */
    getHandler(callback) {

        let type = this.type;

        if (this.provider === 'file') {

            if (this.media.types.image.indexOf(this.file.extension) > -1) {
                type = "image";
            } else if (this.media.types.video.indexOf(this.file.extension) > -1) {
                type = "video";
            } else {
                type = this.file.extension;
            }
        }

        let handler_path = path.join(process.cwd(), "services/media/handlers/" + this.provider + "_" + type + ".js");

        fs.access(handler_path, fs.F_OK, (error) => {

            if (error) {

                // use default handler

                return callback(path.join(process.cwd(), "services/media/handlers/" + this.provider + "_default" + ".js"));
            }

            callback(handler_path);
        });
    }

    /**
     * set mime type
     * @param mime_type
     */
    setFileType(mime_type) {

        if (mime_type === "image") mime_type = "image/jpeg";

        let extension = mime.extension(mime_type);

        if (extension === "jpeg") {
            extension = "jpg";
        }

        if (extension === "mpeg") {
            extension = "mpg";
        }

        if (extension === "qt") {
            extension = "mov";
        }

        this.file.extension = extension;
        this.file.mime_type = mime_type;

        for (let type in this.media.types) {
            if (this.media.types[type].indexOf(extension) > -1) {
                this.type = type;
                return type;
            }
        }
    }

    /**
     * set resource binary content
     * @param content
     */
    setFileContent(content) {
        this.file.content = content;
    }

    /**
     * set file type
     * @param type
     */
    setType(type) {
        this.type = type;
    }

    /**
     * set resource provider
     * @param name
     */
    setProvider(name = 'file') {
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
            return callback("File size is too large");
        }

        if ([].concat.apply([], Object.values(this.media.types)).indexOf(this.file.extension) === -1) {
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
        } else if (fs.statSync(this.payload).isFile()) {
            return "path";
        }

        return false;
    }

    getProvider() {

        if (/youtu\.?be/.test(this.payload)) {

            let i, patterns = [
                /youtu\.be\/([^#\&\?]{11})/,  // youtu.be/<id>
                /\?v=([^#\&\?]{11})/,         // ?v=<id>
                /\&v=([^#\&\?]{11})/,         // &v=<id>
                /embed\/([^#\&\?]{11})/,      // embed/<id>
                /\/v\/([^#\&\?]{11})/         // /v/<id>
            ];

            for (let i = 0; i < patterns.length; ++i) {
                if (patterns[i].test(this.payload)) {
                    return {
                        name: "youtube",
                        type: "video"
                    };
                }
            }
        }

        if (/soundcloud\.com/.test(this.payload)) {
            return {
                name: "soundcloud",
                type: "audio"
            };
        }

        return false;
    }

    /**
     * get resource object
     * @returns {*}
     */
    toObject() {

        let resource = this;

        resource.payload_object = undefined;
        resource.media = undefined;
        resource.file = undefined;
        resource.storage = undefined;
        resource.payload = undefined;

        return resource;
    }
}
