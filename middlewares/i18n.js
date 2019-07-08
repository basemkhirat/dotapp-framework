import I18n from 'i18n';
import Config from '~/services/config';
import moment from "moment";

export default function () {

    let config = Config.get("i18n");

    I18n.configure(config);

    return function (req, res, next) {

        let default_locale = config.defaultLocale;

        //console.log(req.headers["accept-language"]);

        if (req.user && config.locales.indexOf(req.user.lang) > -1) {
            default_locale = req.user.lang;
        }

        // if (req.headers["Language"] !== undefined) {
        //     default_locale = req.headers["Language"];
        // }
        //
        // console.log( req.headers['accept-language']);

        req.language = default_locale;

      //  console.log(req.language);

        moment.locale(default_locale);

        next();
    }
}
