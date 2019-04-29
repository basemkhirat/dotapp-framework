import winston from 'winston';
import path from 'path';

export default new class {

    constructor() {

        let env = process.env.NODE_ENV;

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



