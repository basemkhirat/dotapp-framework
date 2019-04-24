export default {


    /**
     * max file size for upload
     */

    max_file_size: 9999999,

    /**
     *  allowed file types for upload
     */

    allowed_file_types: ["jpg", "mp4", "png", "gif", "pdf"],


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
    }

}
