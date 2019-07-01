import request from "request";
import Controller from "~/controllers/Controller";
import Cache from '~/services/cache';

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
     * City code
     * @type {number}
     */
    city = 379252;

    /**
     * Get weather data
     * @param req
     * @param res
     */
    index(req, res) {

        let url = this.baseURL + "/forecast/?cnt=8&units=metric&id=" + this.city + "&appid=" + this.key + "&lang=ar";
        let key = "weather_data";

        Cache.get(key, function (error, data) {
            if (error) return res.serverError(error);
            if (data) return res.ok(data);

            request({url: url, json: true}, (error, response, body) => {
                if (error) return res.serverError(error);

                if (!error && response.statusCode === 200) {
                    Cache.set(key, body, "60m");
                    return res.ok(body);
                }
            });
        });
    }
}

