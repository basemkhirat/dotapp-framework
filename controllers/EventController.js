import Controller from "~/controllers/Controller";
import Event from '~/models/event';
import Like from '~/models/like';
import Follow from '~/models/follow';
import async from "async";

export default class extends Controller {

    /**
     * Find all categories
     * @param req
     * @param res
     */
    find(req, res) {

        if (!req.can("event.manage")) return res.forbidden();

        let query = Event.find();

        if (req.filled("user")) {
            query.where("user", req.param("user"));
        }

        if (req.filled("status")) {
            query.where("status", req.param("status"));
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

        query.populate("categories").populate("tags").populate("user").populate("media");

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "event")
            });
        });
    }

    /**
     * Find one event
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("event.manage")) return res.forbidden();

        let id = req.param("id");

        Event.findById(id)
            .populate("categories")
            .populate("tags")
            .populate("user")
            .populate("media")
            .exec((error, event) => {
                if (error) return res.serverError(error);
                if (!event) return res.notFound(req.lang("event.errors.event_not_found"));

                return res.ok(res.attachPolicies(event, "event"));
            });
    }

    /**
     * Create a new event
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("event.manage")) return res.forbidden();

        let event = new Event();

        event.title = req.param("title", event.title);
        event.slug = req.param("slug", event.slug);
        event.excerpt = req.param("excerpt", event.excerpt);
        event.content = req.param("content", event.content);
        event.media = req.param("media", event.media);
        event.user = req.user.id;
        event.lang = req.param("lang", event.lang);
        event.status = req.param("status", event.status);
        event.published_at = req.param("published_at", event.published_at);
        event.scheduled_at = req.param("scheduled_at", event.scheduled_at);
        event.categories = req.param("categories", event.categories);
        event.tag_names = req.param("tags");
        event.type = req.param("type", event.type);
        event.price = req.param("price", event.price);
        event.address = req.param("address", event.address);
        event.map = req.param("map", event.map);

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
            event.published_at = req.param("published_at", event.published_at);
            event.scheduled_at = req.param("scheduled_at", event.scheduled_at);
            event.categories = req.param("categories", event.categories);
            event.tag_names = req.param("tags");
            event.type = req.param("type", event.type);
            event.price = req.param("price", event.price);
            event.address = req.param("address", event.address);
            event.map = req.param("map", event.map);

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

