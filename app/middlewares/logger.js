import Logger from 'morgan';
import path from 'path';
import fs from 'fs';
import Config from '~/services/config';

export default function () {
    return Config.get('app.env') === 'production' ?
        Logger(
            "combined",
            {stream: fs.createWriteStream(path.join(process.cwd(), 'storage/logs/access.log'))}
        ) : Logger("dev");

}
