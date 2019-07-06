import ffmpeg_bin from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import Media from '~/services/media';
import Log from '~/services/log';
import Storage from '~/services/storage';

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

        if (this.resource.file.extension === "mp4") {
            return this.processMP4(callback);
        }

        Storage.disk("temp").save(this.file.file, this.resource.file.content, 'binary', (error, tempFile) => {

            if (error) return callback(error);

            ffmpeg(Storage.disk("temp").path(tempFile))

                .save(Storage.disk("temp").path(this.resource.file.name + ".mp4"))

                .on('error', () => {
                    callback("Failed to encode video to mp4 format");
                })

                .on('end', () => {

                    // deleting the original video file

                    Storage.disk("temp").delete(this.file.file);
                    Storage.disk("temp").delete(tempFile);

                    this.resource.file.extension = "mp4";
                    this.resource.file.mime_type = "video/mp4";
                    this.resource.file.file = this.resource.file.name + '.' + this.resource.file.extension;
                    this.resource.file.path = this.resource.file.directory + "/" + this.resource.file.file;

                    Storage.disk("temp").read(this.resource.file.name + ".mp4", "binary", (error, data) => {
                        if (error) return callback(error);

                        this.resource.file.content = data;
                        this.processMP4(callback);
                    });
                });
        });
    }

    /**
     * get data from mp4 video
     * @param callback
     */
    processMP4(callback) {

        this.storage.save(this.resource.file.relative_directory + '/' + this.resource.file.file, this.resource.file.content, 'binary', error => {

            if (error) return callback(error);

            Storage.disk("temp").save(this.file.file, this.resource.file.content, 'binary', (error, tempFile) => {

                if (error) return callback(error);

                ffmpeg.ffprobe(Storage.disk("temp").path(tempFile), (error, metadata) => {

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

                    ffmpeg(Storage.disk("temp").path(tempFile))

                        .screenshot(options, Storage.disk("temp").path())

                        .on('error', () => {
                            callback("Failed to take video screenshot");
                        })

                        .on('end', () => {

                            let screenshot = Storage.disk("temp").path(options.filename);

                            Media.upload(screenshot, (error, file) => {
                                if (error) return callback(error);

                                this.resource.image = file.image;

                                Storage.disk("temp").delete(options.filename);
                                Storage.disk("temp").delete(tempFile);

                                callback(null, this.resource);
                            });
                        });
                });

            });
        });

    }
}
