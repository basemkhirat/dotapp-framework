# Storage Service

A rich service provides an easy way to save files to filesystem or CDN like S3.

## Configuration

`config/storage.js` is the configuration file where you can modify drivers


``` javascript

import path from 'path';

export default {

    /**
     * Here you may specify the default filesystem disk that should be used.
     * The "local" storage is enabled by default.
     */

    default: "uploads",

    /**
     * Here you may configure as many filesystem "disks" as you wish, and you
     * may even configure multiple disks of the same driver.
     */

    disks: {

        public: {
            driver: "local",
            path: path.join(process.cwd(), "public"),
            url: process.env.APP_URL
        },

        /**
         * public upload storage
         * used for public file access
         */

        uploads: {
            driver: "local",
            path: path.join(process.cwd(), "public/uploads"),
            url: process.env.APP_URL + "/uploads"
        },

        /**
         * temporary storage
         * used for private file access
         */

        temp: {
            driver: "local",
            path: path.join(process.cwd(), "storage/temp"),
            url: false
        },

        /**
         * s3 cloud storage
         */

        s3: {
            driver: "s3",
            bucket: "cms-js",
            region: "eu-west-1"
        }
    }
}
```
You can define you private storage and use it.

Note: The s3 driver requires to set the aws credentials in `config/services.js`.



## Usage

You can use this service in promise-based or callback way.

``` javascript

import {Storage} from "dotapp/services";

// Save a file to the default driver
let file = await Storage.save("file.txt", "This is the file content");

// To set enconding
let file = await Storage.save("file.txt", "This is the file content", "utf8");

// To check file if already exists
let is_exists = await Storage.exist("file.txt"); // return boolean

// To read the saved file
let buffer = await Storage.read("file.txt"); // return a buffer

// To get the url of saved file
let url = Storage.url("file.txt");

// To get filesystem path of saved file
let path = Storage.path("file.txt");

// To deleted the saved file
await Storage.delete("file.txt");


```
