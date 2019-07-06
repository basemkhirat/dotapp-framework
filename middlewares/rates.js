import rates from 'express-rate-limit';
import Config from '~/services/config';

export default function () {
    return rates(Config.get("rates"));
}
