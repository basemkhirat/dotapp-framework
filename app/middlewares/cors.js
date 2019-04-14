import Cors from 'cors';
import Config from '~/services/config';

export default Cors(Config.get("cors"));
