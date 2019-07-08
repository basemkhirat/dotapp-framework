import I18n from 'i18n';
import Config from '~/services/config';
import moment from "moment";
import parser from 'accept-language-parser';

export default function () {

    let config = Config.get("i18n");

    I18n.configure(config);

    return function (req, res, next) {

        let default_locale = config.defaultLocale;

        if (req.headers["accept-language"] !== undefined) {

            let header_lang = req.headers["accept-language"];

            if (config.locales.indexOf(header_lang) > -1) {

                default_locale = header_lang;

            } else {

                let languages = parser.parse(header_lang);

                if (languages.length) {
                    default_locale = languages[0].code;
                }
            }
        }

        if (req.user && config.locales.indexOf(req.user.lang) > -1) {
            default_locale = req.user.lang;
        }

        req.language = default_locale;

        moment.locale(default_locale);

        next();
    }
}
