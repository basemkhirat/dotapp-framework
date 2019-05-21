import ffmpeg_bin from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import Media from '~/services/media';
import Log from '~/services/log';

export default class {

    constructor(resource) {
        this.resource = resource;
        this.file = resource.file;
        this.storage = resource.storage;
        ffmpeg.setFfmpegPath(ffmpeg_bin.path);
    }

    /**
     * handle video file
     * @param callback
     */
    handle(callback) {

        Log.message("processing video handler", "info");

        this.storage.save(this.resource.file.relative_directory + '/' + this.resource.file.file, this.resource.file.content, 'binary', error => {

            if (error) return callback(error);

            if (this.resource.file.extension === "mp4") {
                return this.processMP4(callback);
            }

            ffmpeg(this.resource.file.directory + '/' + this.resource.file.file)

                .save(this.resource.file.directory + "/" + this.resource.file.name + ".mp4")

                .on('error', () => {
                    callback("Failed to encode video to mp4 format");
                })

                .on('end', () => {

                    // deleting the original video file

                    this.storage.delete(this.resource.file.relative_directory + '/' + this.resource.file.file, () => {
                    });

                    this.resource.file.extension = "mp4";
                    this.resource.file.mime_type = "video/mp4";
                    this.resource.file.file = this.resource.file.name + '.' + this.resource.file.extension;
                    this.resource.file.path = this.resource.file.directory + "/" + this.resource.file.file;

                    this.processMP4(callback);
                });
        });

    }

    /**
     * get data from mp4 video
     * @param callback
     */
    processMP4(callback) {

        ffmpeg.ffprobe(this.resource.file.path, (error, metadata) => {

            if (error) return callback(error);

            this.resource.data = {
                storage: this.resource.storage.disk,
                path: this.resource.file.relative_directory + "/" + this.resource.file.file,
                duration: parseInt(metadata.format.duration),
                mime: this.resource.file.mime_type,
                size: parseInt(metadata.format.size)
            };

            let options = {
                count: 1,
                filename: Date.now() + '.png',
                timemarks: ['00:00:02.000']
            };

            ffmpeg(this.resource.file.directory + "/" + this.resource.file.file)

                .screenshot(options, this.resource.file.directory)

                .on('error', () => {
                    callback("Failed to take video screenshot");
                })

                .on('end', () => {

                    let screenshot = this.resource.file.directory + "/" + options.filename;

                    Media.upload(screenshot, (error, file) => {
                        if (error) return callback(error);

                        this.resource.image = file.image;

                        this.storage.delete(this.resource.file.relative_directory + "/" + options.filename, () => {
                        });

                        callback(null, this.resource);
                    });
                })

        });


    }
}
