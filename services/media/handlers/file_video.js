import ffmpeg_bin from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import Media from '~/services/media';

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

        ffmpeg.ffprobe(this.file.path, (error, metadata) => {

            if (error) return callback(error);

            this.resource.data = {
                storage: this.resource.storage.disk,
                path: this.resource.file.relative_directory + "/" + this.resource.file.file,
                duration: parseInt(metadata.format.duration),
                mime: this.resource.file.mime_type,
                size: this.resource.file.size
            };

            let options = {
                count: 1,
                filename: Date.now() + '.png',
                timemarks: ['00:00:02.000']
            };

            ffmpeg(this.resource.file.directory + "/" + this.resource.file.file)

                .on('error', () => {
                    callback("Failed to take video screenshot");
                })

                .on('end', () => {

                    let screenshot = this.resource.file.directory + "/" + options.filename;

                    Media.upload(screenshot, (error, file) => {
                        if (error) return callback(error);

                        this.resource.image = file.image;

                        this.storage.delete(this.resource.file.relative_directory + "/screenshot.png", () => {});

                        callback(null, this.resource);
                    });
                })

                .screenshot(options, this.resource.file.directory)

        });

    }
}
