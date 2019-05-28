import Media from '~/services/media';
import Config from '~/services/config';
import Log from '~/services/log';

const YouTube = require('simple-youtube-api');

export default class {

    constructor(resource) {
        this.resource = resource;
    }

    /**
     * handle video file
     * @param callback
     */
    handle(callback) {

        Log.message("processing youtube handler", "info");

        let id = this.getID(this.resource.payload);
        let url = 'https://www.youtube.com/watch?v=' + id;

        let youtube = new YouTube(Config.get("services.youtube.key"));

        youtube.getVideo(url).then(video => {

            Media.upload(video.thumbnails.maxres.url, (error, file) => {

                if (error) return callback(error, this.resource);

                this.resource.data = {
                    id: video.id,
                    duration: this.getSeconds(video.raw.contentDetails.duration),
                    embed: "https://www.youtube.com/embed/" + video.id
                };

                this.resource.url = url;
                this.resource.title = video.title;
                this.resource.description = video.description;
                this.resource.image = file.image;

                callback(null, this.resource);
            });

        }).catch(error => {
            return callback("Unable to fetch video details from youtube");
        });
    }

    getID() {

        if (/youtu\.?be/.test(this.resource.payload)) {

            let i, patterns = [
                /youtu\.be\/([^#\&\?]{11})/,  // youtu.be/<id>
                /\?v=([^#\&\?]{11})/,         // ?v=<id>
                /\&v=([^#\&\?]{11})/,         // &v=<id>
                /embed\/([^#\&\?]{11})/,      // embed/<id>
                /\/v\/([^#\&\?]{11})/         // /v/<id>
            ];

            for (let i = 0; i < patterns.length; ++i) {
                if (patterns[i].test(this.resource.payload)) {
                    return patterns[i].exec(this.resource.payload)[1];
                }
            }

        }

        return null;
    }

    getSeconds(duration) {
        var a = duration.match(/\d+/g);

        if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
            a = [0, a[0], 0];
        }

        if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
            a = [a[0], 0, a[1]];
        }
        if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
            a = [a[0], 0, 0];
        }

        duration = 0;

        if (a.length == 3) {
            duration = duration + parseInt(a[0]) * 3600;
            duration = duration + parseInt(a[1]) * 60;
            duration = duration + parseInt(a[2]);
        }

        if (a.length == 2) {
            duration = duration + parseInt(a[0]) * 60;
            duration = duration + parseInt(a[1]);
        }

        if (a.length == 1) {
            duration = duration + parseInt(a[0]);
        }
        return duration
    }
}
