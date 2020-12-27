import Controller from "dotapp/controller";
import { Config } from "dotapp/services";
import policies from "~/policies";

export default class extends Controller {
    /**
     * Find all system permissions
     * @param req
     * @param res
     */
    find(req, res) {
        let permissions = policies;

        let allPermissions = [];

        for (let module in permissions) {

            let permissions_list = [];

            for (let action in permissions[module]) {
                permissions_list.push(action);
            }

            allPermissions.push({ name: module, actions: permissions_list });
        }

        return res.ok(allPermissions);
    }
}
