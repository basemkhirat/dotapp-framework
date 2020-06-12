# Media Service

A rich service provides an easy way to upload files.

## Configuration

`config/media.js` is the configuration file where you can modify allowed files extenstions, file size and other options


``` javascript
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
```

## Usage

You can use this service in promise-based or callback way.

``` javascript

import {Media} from "dotapp/services";

 try {

    let file = await Media.upload("https://file-examples.com/wp-content/uploads/2017/10/file_example_JPG_100kB.jpg");

    return res.ok(file);

}catch(error) {

    if(error instanceof Media.FileTypeException){
        return res.validationError([
            {image: ["invalid file type"]}
        ]);
    }

    if(error instanceof Media.FileSizeException){
        return res.validationError([
            {image: ["file size exceeded"]}
        ]);
    }

    return res.serverError(error);
}

```


## Validation

You can add some validation on upload.


``` javascript

import {Media} from "dotapp/services";

 try {

    let options = {
        types: ["jpg", "png"], // a list of file extenstions
        size: 1024  // size in in bytes
    }

    let file = await Media.upload("https://file-examples.com/wp-content/uploads/2017/10/file_example_JPG_100kB.jpg", options);

    return res.ok(file);

}catch(error) {

    if(error instanceof Media.FileTypeException){
        return res.validationError([
            {image: ["invalid file type"]}
        ]);
    }

    if(error instanceof Media.FileSizeException){
        return res.validationError([
            {image: ["file size exceeded"]}
        ]);
    }

    return res.serverError(error);
}

```
