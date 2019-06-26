import Controller from "~/controllers/Controller";
import Like from '~/models/like';

export default class extends Controller {

    /**
     * Find all categories
     * @param req
     * @param res
     */
    find(req, res) {

        if (!req.can("category.view")) return res.forbidden();

        let query = Like.where("type", req.param("type")).where("object", req.param("object"));

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("object").populate("user");

        query.execWithCount((error, result) => {

            if (error) return res.serverError(error);

            return res.ok({
                total: result.total,
                docs: result.docs
            });

        });
    }

    /**
     * Like object
     * @param req
     * @param res
     * @returns {*}
     */
    like(req, res) {

        if (!req.can("like.create")) return res.forbidden();

        Like.where("type", req.param("type"))
            .where("object", req.param("object"))
            .where("user", req.param("user"))
            .findOne()
            .exec((error, like) => {
                if (error) return res.serverError(error);
                if (like) return res.notFound(req.lang("like.errors.like_exists"));

                like = new Like();

                like.type = req.param("type", like.type);
                like.object = req.param("object", like.object);
                like.user = req.user.id;

                like.save((error, like) => {
                    if (error) return res.serverError(error);
                    return res.message(req.lang("like.events.created")).ok(like.id);
                });
            });
    }

    /**
     * Unlike object
     * @param req
     * @param res
     */
    unlike(req, res) {

        Like.where("type", req.param("type"))
            .where("object", req.param("object"))
            .where("user", req.param("user"))
            .findOne()
            .exec((error, like) => {
                if (error) return res.serverError(error);
                if (!like) return res.notFound(req.lang("like.errors.like_not_found"));

                like.remove(error => {
                    if (error) res.serverError(error);
                    return res.message(req.lang("like.events.deleted")).ok(id);
                });
            });
    }
};

