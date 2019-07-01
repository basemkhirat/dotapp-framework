import request from "request";
import Controller from "~/controllers/Controller";
import Cache from '~/services/cache';

export default class extends Controller {

    index(req, res) {

        let url = "http://api.openweathermap.org/data/2.5/forecast/?cnt=8&units=metric&id=379252&appid=3280d7e53dd8de414de2cae6d9d3cfd5&lang=ar";
        let key = "weather_data";

        Cache.get(key, function (error, data) {
            if (error) return res.serverError(error);
            if (data) return res.ok(data);

            request({
                url: url,
                json: true
            }, function (error, response, body) {
                if (error) return res.serverError(error);

                if (!error && response.statusCode === 200) {
                    Cache.set(key, body, "60m");
                    return res.ok(body);
                }
            });
        });

    }
}

