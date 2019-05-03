import mongoose from 'mongoose';
import Log from "~/services/log";
import Config from '~/services/config';

export default new class {

    constructor() {

        if(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== "testing") {
            mongoose.set('debug', true);
        }

        mongoose.set('toObject', {
            getters: true,
            virtuals: true,
            minimize: true,
            versionKey: false
        });

        mongoose.set('toJSON', {
            getters: true,
            virtuals: true,
            minimize: true,
            versionKey: false,
        });

        this.connect();
    }

    connect() {

        let config = Config.get("database");

        mongoose.connect(config.url, config.options);

        mongoose.connection.on('connected', function () {
            Log.message('Mongodb connection established to ' + config.url, 'info');
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
