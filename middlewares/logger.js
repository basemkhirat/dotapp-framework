import Logger from 'morgan';
import path from 'path';
import fs from 'fs';

/**
 * Access log is displayed in console in development
 * and logged in access.log in production
 * @returns {logger}
 */
export default function () {
    return process.env.NODE_ENV !== 'production' ?
        Logger("dev") : Logger(
            "combined",
            {stream: fs.createWriteStream(path.join(process.cwd(), 'storage/logs/access.log'))}
        );
}
