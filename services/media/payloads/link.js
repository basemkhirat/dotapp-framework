import request from 'request';
import Log from '~/services/log';

export default class {

    store(callback) {

        /**
         * here we will check if it's youtube link or soundcloud link etc.
         * we will set provider and callback to the resource class to
         * execute handler of this type&provider
         */

        let link = this.getData(this.payload);

        if(link){
            this.setProvider(link.provider);
            this.setType(link.type);
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

                    this.storage.save(file, data, 'binary', (error, file) => {
                        if (error) return callback(error);
                        return callback(null, this.file);
                    });
                });
            });
        });
    }
}
