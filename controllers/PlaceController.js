import Controller from "~/controllers/Controller";
import Place from '~/models/place';
import async from "async";

export default class extends Controller {

    /**
     * Find one place
     * @param req
     * @param res
     */
    findOne(req, res) {

        let id = req.param("id");

        Place.findById(id).populate({path: "parent", populate: {path: "parent"}}).exec((error, place) => {
            if (error) return res.serverError(error);
            if (!place) return res.notFound(req.lang("place.errors.place_not_found"));

            return res.ok(res.attachPolicies(place, "place"));
        });
    }

    /**
     * Find place by slug
     * @param req
     * @param res
     */
    findBySlug(req, res) {

        let slug = req.param("slug");

        Place.where("slug", slug).findOne()
            .populate({path: "parent", populate: {path: "parent"}})
            .exec((error, place) => {
                if (error) return res.serverError(error);
                if (!place) return res.notFound(req.lang("place.errors.place_not_found"));

                return res.ok(res.attachPolicies(place, "place"));
            });
    }

    /**
     * Find all places
     * @param req
     * @param res
     */
    find(req, res) {

        let query = Place.find();

        if (req.filled("q")) {
            query.where("name", new RegExp(req.param("q")));
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate({path: "parent", populate: {path: "parent"}});

        query.execWithCount((error, result) => {

            if (error) return res.serverError(error);

            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "place")
            });
        });
    }


    /**
     * search for a place
     * @param req
     * @param res
     */
    search(req, res) {

        let query = Place.find();

        if (req.filled("q")) {
            query.where("name.ar", new RegExp(req.param("q")));
        }

        query.page(req.param("page"), req.param("limit"));

        query.populate({path: "parent", populate: {path: "parent"}});

        query.execWithCount((error, result) => {

            if (error) return res.serverError(error);

            let records = result.docs.map(row => {

                let name = row.name;

                if (row.parent) {
                    name += " - " + row.parent.name;
                    if (row.parent.parent) {
                        name += " - " + row.parent.parent.name;
                    }
                }

                return {
                    id: row.id,
                    name
                };
            });

            return res.ok({
                total: result.total,
                docs: records
            });
        });
    }

    /**
     * Create a new place
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("place.create")) return res.forbidden();

        let place = new Place();

        place.name = req.param("name", place.name);
        place.slug = req.param("slug", place.slug);
        place.parent = req.param("parent", place.parent);

        place.save((error, place) => {
            if (error) return res.serverError(error);
            return res.message(req.lang("place.events.created")).ok(place.id);
        });
    }

    /**
     * Update place by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Place.findById(id, (error, place) => {
            if (error) return res.serverError(error);
            if (!place) return res.notFound(req.lang("place.errors.place_not_found"));

            if (!req.can("place.update", place)) {
                return res.forbidden(req.lang("place.errors.update_denied", {place: place.name}));
            }

            place.name = req.param("name", place.name);
            place.slug = req.param("slug", place.slug);
            place.parent = req.param("parent", place.parent);


            place.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("place.events.updated")).ok(id);
            });
        });
    }

    /**
     * Delete place by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Place.findById(id, (error, place) => {
            if (error) return res.serverError(error);
            if (!place) return res.notFound(req.lang("place.errors.place_not_found"));

            if (!req.can("place.delete", place)) {
                return res.forbidden(req.lang("place.errors.delete_denied", {place: place.name}));
            }

            place.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("place.events.deleted")).ok(id);
            });

        });
    }

    /**
     * Bulk operations
     * @param req
     * @param res
     */
    bulk(req, res) {

        let operation = req.param("operation");
        let ids = req.param("ids");
        let data = req.param("data");

        ids = Array.isArray(ids) ? ids : ids.toArray(",");

        if (req.filled("data")) {
            data = typeof data === 'object' ? data : JSON.parse(data);
        }

        if (["delete"].indexOf(operation) <= -1) {
            return res.serverError(req.lang("place.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                Place.findById(id, (error, place) => {

                    if (error) return res.serverError(error);
                    if (!place) return res.notFound(req.lang("place.errors.place_not_found"));

                    if (operation === "delete") {

                        if (!req.can("place.delete", place)) {
                            return res.forbidden(req.lang("place.errors.delete_denied", {
                                place: place.name
                            }));
                        }

                        place.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    }
                });
            },

            (error, result = []) => {

                if (operation === "delete") {
                    return res.message(req.lang("place.events.deleted")).ok(result);
                }
            }
        );

    }
};

