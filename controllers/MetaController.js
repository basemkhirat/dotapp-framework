import Controller from "~/controllers/Controller";
import Meta from '~/models/meta';
import Post from '~/models/post';

export default class extends Controller {

    async find(req, res) {

        let type = req.param("type", "home");

        let meta = await Meta.where("type", "default").findOne();

        if (type == "home") {
            return res.ok(meta);
        }

        if (type == "post") {

            let id = req.param("id");

            let meta = await Post.meta(id, req.language);

            let post = await Post.where("id", id)
                .findOne();

            return res.ok(post);

        }

        return res.ok("done");
    }


};

