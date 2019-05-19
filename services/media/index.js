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
            if (error) return callback(error);

            callback(null, new Media(resource.toObject()));
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
            if (error) return callback(error);

            media.save((error, media) => {
                if (error) return callback(error);
                callback(null, media);
            });
        });
    }
}
