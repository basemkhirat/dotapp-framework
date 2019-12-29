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
         * convert all images to jpg
         */

        force_jpeg: true,

        /**
         * Image quality
         */

        quality: 100,

        /**
         *  modes: scaleToFit, cover, scale, resize, contain
         */

        thumbnails: [
            {name: "medium", width: 350, height: 256, mode: "scaleToFit", quality: 100},
            {name: "small", width: 230, height: 150, mode: "scaleToFit", quality: 100},
            {name: "large", width: 730, height: 460, mode: "scaleToFit", quality: 100},
            {name: "max", width: 800, height: 600, mode: "scaleToFit", quality: 100}
        ]
    }
}
