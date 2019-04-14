import Cors from 'cors';
import Config from '~/services/config';

export default function () {
    return Cors(Config.get("cors"));
}
