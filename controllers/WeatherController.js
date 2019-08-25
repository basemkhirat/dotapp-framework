import request from "request";
import Controller from "~/controllers/Controller";
import Cache from 'dotapp/services/cache';

export default class extends Controller {

    /**
     * Open weather map base url
     * @type {string}
     */
    baseURL = "http://api.openweathermap.org/data/2.5";

    /**
     * Open weather key
     * @type {string}
     */
    key = "3280d7e53dd8de414de2cae6d9d3cfd5";

    /**
     * Get weather data
     * @param req
     * @param res
     */
    index(req, res) {

        let lang = req.param("lang", req.language);
        let city = req.param("city", "");

        if(city === ""){
            return res.validationError(req.lang("weather.errors.city_required"));
        }

        let url = this.baseURL + "/forecast/daily?cnt=8&units=metric&q=" + city + "&appid=" + this.key + "&lang=" + lang;
        let key = "weather-" + city + "-" + lang;

        Cache.get(key, function (error, data) {
            if (error) return res.serverError(error);
            if (data) return res.ok(data);

            request({url: url, json: true}, (error, response, body) => {
                if(error) return res.serverError(error);

                if (response.statusCode === 404) {
                    return res.notFound(req.lang("weather.errors.city_not_found"));
                }

                if (response.statusCode === 200) {
                    Cache.set(key, body, "5h");
                    return res.ok(body);
                }

                return res.serverError(body);
            });
        });
    }
}

