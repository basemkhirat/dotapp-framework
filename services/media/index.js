import Resource from '~/services/media/resource';
import Media from '~/models/media';

export default new class Index {

    /**
     * upload a new resource
     * @param payload
     * @param callback
     * @returns {*}
     */
    upload(payload, callback) {

        if (!payload) {
            return callback("Invalid media payload. Available protocols: data:, http:, https");
        }

        let object = new Resource(payload);

        object.store((error, resource) => {

            let media = new Media();

            media.provider = resource.provider;
            media.type = resource.file.type;

            if(resource.file.type === "image"){
                media.data = {
                    storage: resource.storage.disk,
                    path: resource.file.relative_directory + "/" + resource.file.file,
                    width: resource.file.meta.width,
                    height: resource.file.meta.height,
                    mime: resource.file.mime_type,
                    size: resource.file.size
                }
            }

            if(resource.file.type === "video"){
                media.data = {
                    storage: resource.storage.disk,
                    path: resource.file.relative_directory + "/" + resource.file.file,
                    duration: resource.file.meta.duration,
                    mime: resource.file.mime_type,
                    size: resource.file.size
                }
            }

            callback(error, media);
        });
    }

    /**
     * create a new resource
     * @param payload
     * @param callback
     * @returns {*}
     */
    create(payload, callback) {

        this.upload(payload, (error, media) => {
            if(error) return callback(error);

            media.save((error, media) => {
                if(error) return callback(error);
                callback(null, media);
            });
        });

    }
}
