import Jimp from 'jimp';
import async from 'async';
import Config from '~/services/config';

export default class Image {

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

        async.mapSeries(this.config.thumbnails,

            (thumbnail, cb) => {

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
                return callback(null, this.resource);
            });
    }
}
