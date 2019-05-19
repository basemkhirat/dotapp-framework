import Media from '~/services/media';

export default class {

    constructor(resource) {
        this.resource = resource;
        this.file = resource.file;
        this.storage = resource.storage;
    }

    /**
     * handle video file
     * @param callback
     */
    handle(callback) {


        Media.upload(screenshot, (error, file) => {
            if (error) return callback(error);

            this.resource.image = file.image;

            this.storage.delete(this.resource.file.relative_directory + "/" + options.filename, () => {});

            callback(null, this.resource);
        });



    }
}
