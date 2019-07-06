import Log from '~/services/log';

export default class {

    constructor(resource) {
        this.resource = resource;
        this.file = resource.file;
        this.storage = resource.storage;
    }

    /**
     * save file
     * @param callback
     */
    handle(callback) {

        Log.message("processing default handler", "info");

        this.storage.save(this.file.relative_directory + '/' + this.file.file, this.resource.file.content, 'binary', error => {

            if (error) return callback(error);

            this.resource.data = {
                storage: this.storage.disk,
                path: this.file.relative_directory + "/" + this.file.file,
                mime: this.file.mime_type,
                size: this.file.size
            };

            return callback(null, this.resource);
        });
    }
}
