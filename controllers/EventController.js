import Controller from "~/controllers/Controller";
import Event from '~/models/event';
import Like from '~/models/like';
import Reservation from '~/models/reservation';
import Follow from '~/models/follow';
import async from "async";

export default class extends Controller {

    /**
     * Find all categories
     * @param req
     * @param res
     */
    find(req, res) {

        let query = Event.find();

        if (req.filled("user")) {
            query.where("user", req.param("user"));
        }

        if (req.filled("status")) {
            query.where("status", req.param("status"));
        }

        if (req.filled("type")) {
            query.where("type", req.param("type"));
        }

        if (req.filled("address")) {
            query.where("address", new RegExp(req.param("address")));
        }

        if (req.filled("tags")) {
            let tags = Array.isArray(req.param("tags")) ? req.param("tags") : req.param("tags").toArray();
            query.where('tags').in(tags);
        }

        if (req.filled("categories")) {
            let categories = Array.isArray(req.param("categories")) ? req.param("categories") : req.param("categories").toArray();
            query.where('categories').in(categories);
        }

        if (req.filled("from_date")) {
            query.where({'scheduled_at': {$gte: req.param("from_date")}});
        }

        if (req.filled("to_date")) {
            query.where({'scheduled_at': {$lte: req.param("to_date")}});
        }

        if (req.filled("q")) {
            query.where({$text: {$search: req.param("q")}});
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("all_likes").populate("categories").populate("tags").populate("user").populate("media");

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);

            if (req.user) {

                async.map(result.docs, function (event, callback) {

                        event.isLikedBy(req.user.id, (error, liked) => {
                            if (error) return res.serverError(error);

                            event.is_liked = liked;

                            callback(error, event);
                        });
                    },
                    function (error, events) {
                        return res.ok({
                            total: result.total,
                            docs: res.attachPolicies(events, "event")
                        });
                    }
                );

            } else {
                return res.ok({
                    total: result.total,
                    docs: res.attachPolicies(result.docs, "event")
                });
            }

        });
    }

    /**
     * Find one event
     * @param req
     * @param res
     */
    findOne(req, res) {

        let id = req.param("id");

        Event.findById(id)
            .populate("categories")
            .populate("tags")
            .populate("user")
            .populate("media")
            .populate({path: "place", populate: {path: "parent", populate: {path: "parent"}}})
            .exec((error, event) => {
                if (error) return res.serverError(error);
                if (!event) return res.notFound(req.lang("event.errors.event_not_found"));

                if (req.user) {
                    event.isLikedBy(req.user.id, (error, liked) => {
                        if (error) return res.serverError(error);
                        event.is_liked = liked;

                        return res.ok(res.attachPolicies(event, "event"));
                    });
                } else {
                    return res.ok(res.attachPolicies(event, "event"));
                }
            });
    }

    /**
     * Find event by slug
     * @param req
     * @param res
     */
    findBySlug(req, res) {

        let slug = req.param("slug");

        Event.where("slug", slug).findOne()
            .populate("categories")
            .populate("tags")
            .populate("user")
            .populate("media")
            .populate({path: "place", populate: {path: "parent", populate: {path: "parent"}}})
            .exec((error, event) => {
                if (error) return res.serverError(error);
                if (!event) return res.notFound(req.lang("event.errors.event_not_found"));

                if (req.user) {
                    event.isLikedBy(req.user.id, (error, liked) => {
                        if (error) return res.serverError(error);
                        event.is_liked = liked;

                        return res.ok(res.attachPolicies(event, "event"));
                    });
                } else {
                    return res.ok(res.attachPolicies(event, "event"));
                }
            });
    }

    /**
     * Find my liked events
     * @param req
     * @param res
     */
    my_likes(req, res) {

        Like.where("type", "event")
            .populate("user")
            .populate({
                path: "object",
                populate: {
                    path: "media"
                }
            })
            .populate({
                path: "object",
                populate: {
                    path: "categories"
                }
            })
            .populate({
                path: "object",
                populate: {
                    path: "tags"
                }
            })
            .populate({
                path: "object",
                populate: {
                    path: "user"
                }
            })

            .where("user", req.user.id)
            .page(req.param("page"), req.param("limit"))
            .order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"))
            .execWithCount((error, result) => {

                if (error) return res.serverError(error);

                let docs = result.docs;

                docs = docs.map((doc) => {
                    doc.object.is_liked = true;
                    return doc;
                });

                return res.ok({
                    total: result.total,
                    docs: docs
                });
            });
    }

    /**
     * Find my liked events
     * @param req
     * @param res
     */
    my_registrations(req, res) {

        Reservation.where("user", req.user.id).populate("user")
            .populate({
                path: "event",
                populate: {
                    path: "media"
                }
            })
            .populate({
                path: "event",
                populate: {
                    path: "categories"
                }
            })
            .populate({
                path: "event",
                populate: {
                    path: "tags"
                }
            })
            .populate({
                path: "event",
                populate: {
                    path: "user"
                }
            })
            .page(req.param("page"), req.param("limit"))
            .order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"))
            .execWithCount((error, result) => {

                if (error) return res.serverError(error);

                return res.ok({
                    total: result.total,
                    docs: result.docs
                });
            });
    }

    /**
     * Create a new event
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {


        let event = new Event();

        event.title = req.param("title", event.title);
        event.slug = req.param("slug", event.slug);
        event.excerpt = req.param("excerpt", event.excerpt);
        event.content = req.param("content", event.content);
        event.media = req.param("media", event.media);
        event.media_payload = req.param("media_payload");
        event.user = req.user.id;
        event.lang = req.param("lang", event.lang);
        event.published_at = req.param("published_at", event.published_at);
        event.scheduled_at = req.param("scheduled_at", event.scheduled_at);
        event.categories = req.param("categories", event.categories);
        event.tag_names = req.param("tags");
        event.type = req.param("type", event.type);
        event.price = req.param("price", event.price);
        event.currency = req.param("currency", event.currency);
        event.address = req.param("address", event.address);
        event.map = req.param("map", event.map);
        event.status = req.can("event.manage") ? req.param("status", event.status) : 0;
        event.place = req.param("place", event.place);

        event.save((error, event) => {
            if (error) return res.serverError(error);
            return res.message(req.lang("event.events.created")).ok(event.id);
        });
    }

    /**
     * Update event by id
     * @param req
     * @param res
     */
    update(req, res) {

        if (!req.can("event.manage")) return res.forbidden();

        let id = req.param("id");

        Event.findById(id, (error, event) => {
            if (error) return res.serverError(error);
            if (!event) return res.notFound(req.lang("event.errors.event_not_found"));

            event.title = req.param("title", event.title);
            event.slug = req.param("slug", event.slug);
            event.excerpt = req.param("excerpt", event.excerpt);
            event.content = req.param("content", event.content);
            event.status = req.param("status", event.status);
            event.lang = req.param("lang", event.lang);
            event.media = req.param("media", event.media);
            event.media_payload = req.param("media_payload");
            event.published_at = req.param("published_at", event.published_at);
            event.scheduled_at = req.param("scheduled_at", event.scheduled_at);
            event.categories = req.param("categories", event.categories);
            event.tag_names = req.param("tags");
            event.type = req.param("type", event.type);
            event.price = req.param("price", event.price);
            event.currency = req.param("currency", event.currency);
            event.address = req.param("address", event.address);
            event.map = req.param("map", event.map);
            event.place = req.param("place", event.place);

            if (req.filled("tags")) {
                event.tag_names = req.param("tags");
            }

            event.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("event.events.updated")).ok(id);
            });
        });
    }

    /**
     * like/unlink event
     * @param req
     * @param res
     */
    like(req, res) {

        let id = req.param("id");

        Event.findById(id, (error, event) => {
            if (error) return res.serverError(error);
            if (!event) return res.notFound(req.lang("event.errors.event_not_found"));

            Like.toggle({
                type: "event",
                object: id,
                user: req.user.id
            }, (error, state) => {
                if (error) return res.serverError(error);

                if (state === "liked") {
                    event.likes = event.likes + 1;
                } else if (state === "unliked") {
                    event.likes = event.likes - 1;
                }

                event.save(error => {
                    if (error) return res.serverError(error);

                    res.ok(state);
                });
            });
        });

    }

    /**
     * register/unregister event
     * @param req
     * @param res
     */
    register(req, res) {

        let id = req.param("id");

        Event.findById(id, (error, event) => {
            if (error) return res.serverError(error);
            if (!event) return res.notFound(req.lang("event.errors.event_not_found"));

            let reservation = new Reservation();

            reservation.event = id;
            reservation.user = req.user.id;
            reservation.first_name = req.param("first_name");
            reservation.last_name = req.param("last_name");
            reservation.email = req.param("email");

            reservation.save(error => {
                if (error) return res.serverError(error);

                event.registerations = event.registerations + 1;

                req.mail({
                    user: reservation,
                    event: event
                }, "EventReserved");

                event.save(error => {
                    if (error) return res.serverError(error);
                    res.ok(reservation.id);
                });
            });

        });

    }

    /**
     * follow/unfollow event
     * @param req
     * @param res
     */
    follow(req, res) {

        let id = req.param("id");

        Event.findById(id, (error, event) => {
            if (error) return res.serverError(error);
            if (!event) return res.notFound(req.lang("event.errors.event_not_found"));

            Follow.toggle({
                type: "event",
                object: id,
                user: req.user.id
            }, (error, state) => {
                if (error) return res.serverError(error);

                if (state === "followed") {
                    event.followers = event.followers + 1;
                } else if (state === "unfollowed") {
                    event.followers = event.followers - 1;
                }

                event.save(error => {
                    if (error) return res.serverError(error);

                    res.ok(state);
                });
            });
        });

    }

    /**
     * Delete event by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        if (!req.can("event.manage")) return res.forbidden();

        let id = req.param("id");

        Event.findById(id, (error, event) => {
            if (error) return res.serverError(error);
            if (!event) return res.notFound(req.lang("event.errors.event_not_found"));

            event.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("event.events.deleted")).ok(id);
            });

        });
    }

    /**
     * Bulk operations
     * @param req
     * @param res
     */
    bulk(req, res) {

        if (!req.can("event.manage")) return res.forbidden();

        let operation = req.param("operation");
        let ids = req.param("ids");
        let data = req.param("data");

        ids = Array.isArray(ids) ? ids : ids.toArray(",");

        if (req.filled("data")) {
            data = typeof data === 'object' ? data : JSON.parse(data);
        }

        if (["delete", "update"].indexOf(operation) <= -1) {
            return res.serverError(req.lang("event.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                Event.findById(id, (error, event) => {

                    if (error) return res.serverError(error);
                    if (!event) return res.notFound(req.lang("event.errors.event_not_found"));

                    if (operation === "delete") {

                        event.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    } else if (operation === "update") {

                        if ("status" in data) {
                            event.status = data.status || event.status;
                        }

                        event.save(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });
                    }
                });

            },

            (error, result = []) => {

                if (operation === "update") {
                    return res.message(req.lang("event.events.updated")).ok(result);
                }

                if (operation === "delete") {
                    return res.message(req.lang("event.events.deleted")).ok(result);
                }
            }
        );

    }
};

