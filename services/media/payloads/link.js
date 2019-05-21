import request from 'request';
import Log from '~/services/log';

export default class {

    handle(callback) {

        /**
         * here we will check if it's youtube link or soundcloud link etc.
         * we will set provider and callback to the resource class to
         * execute handler of this type&provider
         */

        let provider = this.getProvider(this.payload);

        if(provider){
            this.setProvider(provider.name);
            this.setType(provider.type);
            return callback(null, this.file);
        }

        /**
         * else: save the link as a file.
         */

        Log.message("getting file from link", "info");

        this.setProvider("file");

        request({uri: this.payload, encoding: 'binary'}, (error, response, data) => {

            if (error) return callback("Failed to fetch this link");

            this.setFileType(response.headers["content-type"]);
            this.setFileSize(data.toString().length);

            this.validate((error) => {
                if (error) return callback(error);

                this.generateFileName((error, file) => {
                    if (error) return callback(error);

                    this.setFileContent(data);

                    callback();
                });
            });
        });
    }
}
