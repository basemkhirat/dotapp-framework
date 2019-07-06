import Log from '~/services/log';

export default class {

    handle(callback) {

        Log.message("getting file from base64 data", "info");

        this.setProvider("file");

        let matches = this.payload.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            return callback('Invalid base64 data');
        }

        let type = matches[1], data = matches[2];

        this.setFileType(type);
        this.setFileSize(Buffer.byteLength(data, 'base64'));

        this.validate((error) => {
            if (error) return callback(error);

            this.generateFileName((error, file) => {
                if (error) return callback(error);

                data = Buffer.from(data, 'base64');

                this.setFileContent(data);

                callback();
            });
        });
    }
}
