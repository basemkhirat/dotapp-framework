import I18n from 'i18n';
import Config from '~/services/config';
import moment from "moment";

export default function () {

    return function (req, res, next) {

        let config = Config.get("i18n");

        if(req.user) {

            let locales = _config("i18n.locales");

            if(locales.indexOf(req.user.lang) > -1){
                config.defaultLocale = req.user.lang;
            }
        }

        moment.locale(config.defaultLocale);

        I18n.configure(config);

        I18n.init(req, res);

        return next();
    };

}
