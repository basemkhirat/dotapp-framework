import Controller from './Controller';
import Place from '~/models/place';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    index(req, res, next) {


        let places = Place.find();

        places.populate({path: "parent", populate: {path: "parent"}});

        places.find((error, places) => {
            if(error) return res.serverError(error);
            res.ok(places);
        })


    }
};
