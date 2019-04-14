import BodyParser from 'body-parser';
import Config from '~/services/config';

export default BodyParser.urlencoded(Config.get("body"));
