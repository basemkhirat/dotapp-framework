import ffmpeg_bin from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

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

            callback(null, this.resource);

            // ffmpeg(this.file.path)
            //     .on('end', (filenames) => {
            //         this.file.meta.preview = filenames;
            //         callback(null, this.file);
            //     })
            //     .on('error', (err, stdout, stderr) => {
            //         callback(err);
            //     })
            //     .screenshots({
            //         filename: "file.png",
            //         timemarks: [520.929831],
            //         folder: this.file.directory
            //     });


            // ffmpeg(this.file.path).on('error', function (err) {
            //     if (err) return callback(err);
            // }).takeScreenshots({count: 1, timemarks: ['00:00:02.000']}, this.file.directory, (error, filenames) => {
            //     if (error) return callback(error);
            //     console.log(filenames);
            //     console.log('screenshots were saved');
            //     callback(null, this.file);
            // });
        });

    }
}
