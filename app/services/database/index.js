import mongoose from 'mongoose';
import Log from "~/services/log";
import Config from '~/services/config';

class Index {

    constructor(config) {

        mongoose.set('useCreateIndex', true);

        mongoose.connect(config.url, config.options);

        mongoose.connection.on('connected', function () {
            Log.message('Mongodb connection established to ' + config.url , 'info');
        });

        mongoose.connection.on('error', function (error) {
            Log.message('Mongodb connection error: ' + error, 'error');
        });

        mongoose.connection.on('disconnected', function () {
            Log.message('Mongodb connection disconnected', 'warn');
        });

        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                Log.message('Mongodb connection disconnected through app termination', 'info');
                process.exit();
            });
        });
    }

}

export default new Index(Config.get("db"))
