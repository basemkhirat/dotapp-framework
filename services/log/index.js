import winston from 'winston';
import path from 'path';
import Config from '~/services/config';

class Index {

    constructor(env) {

        this.logger = winston.createLogger({
            transports: [
                new winston.transports.File({
                    filename: path.join(process.cwd(), 'storage/logs/error.log'),
                    level: 'error'
                }),
                new winston.transports.File({
                    filename: path.join(process.cwd(), 'storage/logs/combined.log')
                })
            ]
        });

        if (env !== 'production') {
            this.logger.add(
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })
            );
        }

    }

    message(message, level = 'error') {
        this.logger.log({
            level: level,
            message: message
        });
    }
}

export default new Index(process.env.NODE_ENV);



