import BodyParser from 'body-parser';
import Config from '~/services/config';

export default function () {
    return BodyParser.json(Config.get('json'));
}
