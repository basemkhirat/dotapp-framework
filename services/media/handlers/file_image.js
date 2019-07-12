import Jimp from 'jimp';
import async from 'async';
import Log from '~/services/log';
import Config from '~/services/config';

export default class {

    constructor(resource) {
        this.resource = resource;
        this.file = resource.file;
        this.storage = resource.storage;
        this.config = Config.get("media.image");
    }

    /**
     * Force conversion to JPG if enabled
     * @param callback
     */
    handle(callback) {

        Log.message("processing image handler", "info");

        if (this.config.force_jpeg && ["jpg", "jpeg"].indexOf(this.resource.file.extension) < 0) {

            Jimp.read(Buffer.from(this.resource.file.content, "binary"), (error, jImage) => {

                if (error) return cb(error);

                jImage.getBuffer("image/jpeg", (error, data) => {
                    if (error) return cb(error);

                    this.resource.file.extension = "jpg";
                    this.resource.file.mime_type = "image/jpeg";
                    this.resource.file.file = this.resource.file.name + '.' + this.resource.file.extension;
                    this.resource.file.path = this.resource.file.directory + "/" + this.resource.file.file;
                    this.resource.file.content = data;

                    this.processJPG(callback);
                });
            });

        } else {
            return this.processJPG(callback);
        }

    }

    /**
     * create image thumbnails
     * @param callback
     */
    processJPG(callback) {

        this.storage.save(this.file.relative_directory + '/' + this.file.file, this.resource.file.content, 'binary', error => {

            if (error) return callback(error);

            async.mapSeries(this.config.thumbnails, (thumbnail, cb) => {

                    Jimp.read(Buffer.from(this.resource.file.content, "binary"), (error, jImage) => {

                        if (error) return cb(error);

                        this.file.meta = {
                            width: jImage.getWidth(),
                            height: jImage.getHeight()
                        };

                        let mode = thumbnail.mode ? thumbnail.mode : "resize";
                        let width = thumbnail.width ? thumbnail.width : jImage.AUTO;
                        let height = thumbnail.height ? thumbnail.height : jImage.AUTO;
                        let quality = thumbnail.quality ? thumbnail.quality : this.config.quality;

                        let process = jImage[mode](width, height).quality(quality);

                        process.getBase64(this.file.mime_type, (error, data) => {
                            if (error) return cb(error);

                            let native_data = data.split(",").pop();

                            this.storage.save(
                                this.file.relative_directory + "/" + thumbnail.name + "-" + this.file.file,
                                native_data,
                                "base64",
                                () => {
                                    cb(null);
                                }
                            );
                        });

                    });
                },

                error => {
                    if (error) return callback(error);

                    this.resource.image = {
                        storage: this.resource.storage.disk,
                        path: this.resource.file.relative_directory + "/" + this.resource.file.file,
                        width: this.resource.file.meta.width,
                        height: this.resource.file.meta.height,
                        mime: this.resource.file.mime_type,
                        size: this.resource.file.size,
                        thumbnails: Config.get("media.image.thumbnails")
                            .map(thumbnail => thumbnail.name)
                            .map(name => {
                                return name;
                            })
                    };

                    return callback(null, this.resource);
                });
        });
    }

    /**
     *
     * @param path
     * @param thumbnail
     * @returns {string}
     */
    static getThumbnailFileName(path, thumbnail) {
        let segments = path.split("/");
        return segments[0] + "/" + segments[1] + "/" + thumbnail + "-" + segments[2];
    }
}
