import Controller from "~/controllers/Controller";
import Device from '~/models/device';
import async from "async";

export default class extends Controller {

    /**
     * Find one device
     * @param req
     * @param res
     */
    findOne(req, res) {

        let id = req.param("id");

        Device.findById(id).populate("user").exec((error, device) => {
            if (error) return res.serverError(error);
            if (!device) return res.notFound(req.lang("device.errors.device_not_found"));

            return res.ok(res.attachPolicies(device, "device"));
        });
    }

    /**
     * Find device by slug
     * @param req
     * @param res
     */
    findBySlug(req, res) {

        let slug = req.param("slug");

        Device.where("slug", slug).findOne()
            .populate("user")
            .exec((error, device) => {
                if (error) return res.serverError(error);
                if (!device) return res.notFound(req.lang("device.errors.device_not_found"));

                return res.ok(res.attachPolicies(device, "device"));
            });
    }

    /**
     * Find all categories
     * @param req
     * @param res
     */
    find(req, res) {

        let query = Device.find().where("parent", req.param("parent"));

        if (req.filled("user")) {
            query.where("user", req.param("user"));
        }

        if (req.filled("q")) {
            query.where("name", new RegExp(req.param("q")));
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("user").populate("image").populate("parent");

        query.execWithCount((error, result) => {

            if (error) return res.serverError(error);

            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "device")
            });
        });
    }

    /**
     * Create a new device
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("device.create")) return res.forbidden();

        let device = new Device();

        device.name = req.param("name", device.name);
        device.user = req.user.id;

        device.save((error, device) => {
            if (error) return res.serverError(error);
            return res.message(req.lang("device.events.created")).ok(device.id);
        });
    }

    /**
     * Update device by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Device.findById(id, (error, device) => {
            if (error) return res.serverError(error);
            if (!device) return res.notFound(req.lang("device.errors.device_not_found"));

            if (!req.can("device.update", device)) {
                return res.forbidden(req.lang("device.errors.update_denied", {device: device.name}));
            }

            device.name = req.param("name", device.name);

            device.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("device.events.updated")).ok(id);
            });
        });
    }

    /**
     * Delete device by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Device.findById(id, (error, device) => {
            if (error) return res.serverError(error);
            if (!device) return res.notFound(req.lang("device.errors.device_not_found"));

            if (!req.can("device.delete", device)) {
                return res.forbidden(req.lang("device.errors.delete_denied", {device: device.name}));
            }

            device.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("device.events.deleted")).ok(id);
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
            return res.serverError(req.lang("device.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                Device.findById(id, (error, device) => {

                    if (error) return res.serverError(error);
                    if (!device) return res.notFound(req.lang("device.errors.device_not_found"));

                    if (operation === "delete") {

                        if (!req.can("device.delete", device)) {
                            return res.forbidden(req.lang("device.errors.delete_denied", {
                                device: device.name
                            }));
                        }

                        device.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    }
                });
            },

            (error, result = []) => {

                if (operation === "delete") {
                    return res.message(req.lang("device.events.deleted")).ok(result);
                }
            }
        );

    }
};

