import I18n from 'i18n';
import Config from '~/services/config';

export default function (req, res, next) {

    I18n.configure(Config.get("i18n"));

    I18n.init(req, res);

    return next();
};
