import Logger from 'morgan';
import path from 'path';
import fs from 'fs';
import Config from '~/services/config';

export default function () {
    return process.env.NODE_ENV === 'production' ?
        Logger(
            "combined",
            {stream: fs.createWriteStream(path.join(process.cwd(), 'storage/logs/access.log'))}
        ) : Logger("dev");

}
