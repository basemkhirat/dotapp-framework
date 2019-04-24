import Controller from "~/controllers/Controller";
import Post from '~/models/post';

export default class extends Controller {

    /**
     * Find one post
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("post.view")) return res.forbidden();

        let id = req.param("id");

        Post.findById(id, function (error, post) {
            if (error) return res.serverError(error);
            if (!post) return res.notFound("Post not found");
            return res.ok(res.attachPolicies(post, "post"));
        });

    }

    /**
     * Find all posts
     * @param req
     * @param res
     */
    find(req, res) {

        if (!req.can("post.view")) return res.forbidden();

        Post.find().populate("role").exec(function (error, posts) {
            if (error) return res.serverError(error);
            return res.ok(res.attachPolicies(posts, "post"));
        });
    }

    /**
     * Create a new post
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("post.create")) return res.forbidden();

        let post = new Post({
            title: req.param("title"),
            excerpt: req.param("excerpt"),
            content: req.param("content"),
            status: req.param("status")
        });

        post.save(function (error, post) {
            if (error) return res.serverError(error);
            return res.ok(post);
        });
    }

    /**
     * Update post by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Post.findById(id, function (error, post) {
            if (error) return res.serverError(error);
            if (!req.can("post.update", post)) return res.forbidden();
            if (!post) return res.notFound("Post not found");

            if (req.param("title")) {
                post.title = req.param("title");
            }

            if (req.param("excerpt")) {
                post.excerpt = req.param("excerpt");
            }

            if (req.param("content")) {
                post.content = req.param("content");
            }

            if (req.param("status")) {
                post.status = req.param("status");
            }

            post.save(function (error, post) {
                if (error) return res.serverError(error);
                return res.ok(post);
            });
        });
    }

    /**
     * Delete post by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Post.findById(id, function (error, post) {
            if (error) return res.serverError(error);
            if (!req.can("post.delete", post)) return res.forbidden();
            if (!post) return res.notFound("Post not found");

            post.remove(function (error, post) {
                if (error) res.serverError(error);
                return res.ok(post);
            });
        });
    }
};

