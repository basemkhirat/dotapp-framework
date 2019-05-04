import winston from 'winston';
import path from 'path';

export default new class {

    /**
     * Logger initialization
     * file and console logger
     */
    constructor() {

        this.logger = winston.createLogger({

            format: winston.format.printf(info => `${new Date().toISOString()} ${info.message}`),

            transports: [

                /**
                 * log all error messages only to error.log file
                 * in all environments
                 */
                new winston.transports.File({
                    filename: path.join(process.cwd(), 'storage/logs/error.log'),
                    level: 'error'
                }),

                /**
                 * log all messages to console
                 * in all environments
                 */
                new winston.transports.Console({
                    level: Boolean(process.env.APP_CONSOLE) ? 'error' : undefined,
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })

            ]
        });
    }

    /**
     * set log message
     * @param message
     * @param level
     */
    message(message, level = 'error') {
        this.logger.log({
            level: level,
            message: message
        });
    }

}



