import ffmpeg_bin from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
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
     * save file
     * @param callback
     */
    handle(callback) {

        Log.message("processing audio handler", "info");

        this.storage.save(this.file.relative_directory + '/' + this.file.file, this.resource.file.content, 'binary', error => {

            if (error) return callback(error);

            Storage.disk("temp").save(this.file.file, this.resource.file.content, 'binary', (error, file) => {

                if (error) return callback(error);

                ffmpeg.ffprobe(Storage.disk("temp").path(file), (error, metadata) => {

                    if (error) return callback(error);

                    this.resource.data = {
                        storage: this.storage.disk,
                        path: this.file.relative_directory + "/" + this.file.file,
                        duration: parseInt(metadata.format.duration),
                        mime: this.file.mime_type,
                        size: this.file.size
                    };

                    Storage.disk("temp").delete(file);

                    return callback(null, this.resource);
                });
            });
        });
    }
}
