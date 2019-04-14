import Controller from './Controller';
import Role from '~/models/role';

export default class extends Controller{

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    index(req, res, next) {

        console.log(req.can("createPost"));

        return res.ok({
            user: req.user,
            token: req.token
        });
    }
};
