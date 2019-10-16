import Controller from './Controller';
import cheerio from 'cheerio';
import request from "request";
import moment from 'moment';
import Cache from 'dotapp/services/cache';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    async index(req, res, next) {

        let sport_day = req.param("date", moment().format("Y-M-D"))
        let url = "https://www.filgoal.com/matches/?date=" + sport_day;
        let key = "match-" + sport_day;

        Cache.get(key, function (error, data) {
            if (error) return res.serverError(error);
            if (data) return res.ok(data);

            let ms = [];

            request({url: url}, (error, response, body) => {
                if (error) return res.serverError(error);

                if (response.statusCode === 404) {
                    return res.notFound("Not Found");
                }

                if (response.statusCode === 200) {

                    let $ = cheerio.load(body, {decodeEntities: false});

                    let matches = $("div[class=mc-block]").find("div[class=cin_cntnr]");

                    matches.each(function () {

                        let date = $(this).find(".match-aux").find("span").last().text().trim();

                        let date_parts = date.split(" - ");

                        let day = date_parts[0].split("-");
                        let time = date_parts[1].split(":");

                        let new_date = day[2] + "-" + day[1] + "-" + day[0] + "T" + time[0] + ":" + time[1] + ":00Z";

                        date = moment(new_date).format();

                        let match = {
                            first_title: $(this).find(".f").find("strong").html(),
                            first_logo: "https:" + $(this).find(".f").find("img").attr("data-src"),
                            first_score: parseInt($(this).find(".f").find("b").text().trim()),
                            second_title: $(this).find(".s").find("strong").html(),
                            second_logo: "https:" + $(this).find(".s").find("img").attr("data-src"),
                            second_score: parseInt($(this).find(".s").find("b").text()),
                            date: date
                        };

                        ms.push(match);
                    });

                    Cache.set(key, ms, "1h");
                    return res.ok(ms);
                }

                return res.serverError(body);
            });


        });



    }
};
