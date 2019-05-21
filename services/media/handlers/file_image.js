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
     * create image thumbnails
     * @param callback
     */
    handle(callback) {

        Log.message("processing image handler", "info");

        this.storage.save(this.file.relative_directory + '/' + this.file.file, this.resource.file.content, 'binary', error => {

            if (error) return callback(error);

            async.mapSeries(this.config.thumbnails, (thumbnail, cb) => {

                    Jimp.read(this.file.path, (error, jImage) => {

                        this.file.meta = {
                            width: jImage.getWidth(),
                            height: jImage.getHeight()
                        };

                        if (error) return cb(error);

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
                        size: this.resource.file.size
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
