export default {

    /**
     * default media storage
     */

    storage: process.env.MEDIA_STORAGE || "uploads",

    /**
     * max file size for upload
     */

    max_file_size: 100 * 1024 * 1024,

    /**
     *  allowed extensions grouped by type
     */

    types: {
        image: ['jpg', 'jpeg', 'png', 'bmp'],
        video: ['mp4', 'flv', 'avi', '3gp', 'webm', "mkv", "mov", "mpg", "wmv", "swf"],
        audio: ['mp3', 'wav'],
        document: ['txt', 'pdf', 'doc', 'docx', 'rtf', 'csv', 'xls', 'xlsx', 'ppt', 'pptx']
    },

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
            {name: "max", width: 1000, height: 600, mode: "contain", quality: 100},
            {name: "card", width: 300, height: 200, mode: "contain", quality: 100}
        ]
    }
}
