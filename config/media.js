export default {


    /**
     * max file size for upload
     */

    max_file_size: 100 * 1024 * 1024,

    /**
     *  allowed file types for upload
     */

    types: {
        image: ["jpg", "jpeg", "png", "bmp"],
        video: ["mp4", "flv"],
        audio: ["mp3", "wav"],
        document: ['pdf']
    },

    // allowed_file_types: [
    //     "jpg",
    //     "png",
    //     "bmp",
    //     "mp4",
    //     "flv",
    //     "pdf"
    // ],


    image: {

        /**
         * Image quality
         */

        quality: 100,

        /**
         *  modes: scaleToFit, cover, scale, resize, contain
         */

        thumbnails: [
            {name: "medium", width: 256, height: 256, mode: "contain", quality: 100},
            {name: "small", width: 128, height: 128, mode: "contain", quality: 100},
            {name: "large", width: 500, height: 400, mode: "contain", quality: 100},
            {name: "max", width: 1000, height: 600, mode: "contain", quality: 100}
        ]
    },

    /**
     * Services auth key used for getting data
     */
    services: {

        youtube: {
            key: process.env.YOUTUBE_KEY || "AIzaSyBRmwHTeOMV071olVy-eddww5Hi1yDHd_8"
        },

        soundcloud: {
            key: process.env.SOUNDCLOUD_KEY || "203ed54b9fd03054e1aa2b2cae337eae"
        }
    }
}
