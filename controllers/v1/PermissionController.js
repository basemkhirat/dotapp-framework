import Controller from "dotapp/controller";
import { Config } from "dotapp/services";

export default class extends Controller {
    /**
     * Find all system permissions
     * @param req
     * @param res
     */
    find(req, res) {
        let permissions = Config.get("permissions");

        let allPermissions = {};

        for (let module in permissions) {
            permissions[module].forEach((action) => {
                if (module === "role") {
                    return;
                }

                if (!(module in allPermissions)) {
                    allPermissions[module] = {};
                }

                allPermissions[module][module + "." + action] = req.lang(
                    module + ".permissions." + action
                );
            });
        }

        return res.ok(allPermissions);
    }

    /**
     * Find current user permissions
     * @param req
     * @param res
     */
    me(req, res) {
        let permissions = Config.get("permissions");

        let myPermissions = [];

        for (let module in permissions) {
            if (module === "role") {
                continue;
            }

            permissions[module].forEach((action) => {
                if (req.hasPermission(module + "." + action)) {
                    myPermissions.push(module + "." + action);
                }
            });
        }

        return res.ok(myPermissions);
    }
}
