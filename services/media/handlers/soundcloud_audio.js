import request from 'request';
import Config from '~/services/config';

export default class {

    constructor(resource) {
        this.resource = resource;
    }

    /**
     * handle video file
     * @param callback
     */
    handle(callback) {

        this.getTrack(this.resource.payload)
            .then(audio => {

                this.resource.data = {
                    id: audio.id,
                    duration: audio.duration,
                    embed: "https://w.soundcloud.com/player/?url=" + audio.uri
                };

                this.resource.url = audio.permalink_url;
                this.resource.title = audio.title;
                this.resource.description = audio.description;

                callback(null, this.resource);
            })
            .catch(error => {
                return callback(error);
            });
    }

    getTrack(url) {

        return new Promise((resolve, reject) => {

            let api = "http://api.soundcloud.com/resolve.json?url="
                + url + "&client_id=" + Config.get("media.services.soundcloud.key");


            request({uri: api}, (error, response, data) => {
                if (error) return reject(error);

                resolve(JSON.parse(data));
            });
        });
    }
}
