import request from 'request';
import Log from '~/services/log';

export default class Link {

    store(callback) {

        Log.message("getting file from link", "info");

        this.setProvider("local");

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
