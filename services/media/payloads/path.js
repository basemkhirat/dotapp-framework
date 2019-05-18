import Log from '~/services/log';
import fs from 'fs';
import mime from 'mime-types';

export default class {

    store(callback) {

        Log.message("getting file from path", "info");

        this.setProvider("file");

        let data = fs.readFileSync(this.payload).toString('base64');

        this.setFileType(mime.lookup(this.payload));
        this.setFileSize(Buffer.byteLength(data, 'base64'));

        this.validate((error) => {
            if (error) return callback(error);

            this.generateFileName((error, file) => {
                if (error) return callback(error);

                this.storage.save(file, data, 'base64', (error, file) => {
                    if (error) return callback(error);
                    return callback(error, this.file);
                });
            });
        });
    }
}
