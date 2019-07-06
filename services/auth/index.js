import Config from '~/services/config';

class Index {

    /**
     * check user policies
     * @param permission
     * @returns {boolean}
     */
    can(permission, ...params) {

        let policy_check = false;
        let policies = this.req.policies;
        let [module, action] = permission.split(".");

        if (module) {

            if (module in policies) {

                let handler = policies[module];

                if (typeof handler == 'function') {
                    handler = handler(this.req, ...params);
                }

                if (typeof handler == 'boolean') {
                    policy_check = handler;
                }

                if (typeof handler == 'object') {

                    if (action in handler) {

                        handler = handler[action];

                        if (typeof handler == 'boolean') {
                            policy_check = handler;
                        }

                        if (typeof handler == 'function') {
                            policy_check = handler(this.req, ...params);
                        }
                    } else {

                        // Action is not registered in policies

                        return this.req.hasPermission(permission);
                    }
                }
            } else {

                // Module is not registered in policies

                return this.req.hasPermission(permission);
            }

        }

        return policy_check;
    }

    /**
     * check user permissions
     * @param permission
     * @returns {boolean}
     */
    hasPermission(permission) {

        if (this.req.hasRole("superadmin")) return true;

        let [module, action] = permission.split(".");

        if (action === undefined) {

            // match if user has at least one action of module

            let actions = Config.get("permissions." + module);

            return actions.some(action => this.req.permissions.indexOf(module + "." + action) > -1);


        } else if (action === "*") {

            // match if user has all actions of module

            let actions = Config.get("permissions." + module);

            return actions.every(action => this.req.permissions.indexOf(module + "." + action) > -1);

        }

        return this.req.permissions.indexOf(permission) > -1;
    }


    /**
     * get user object
     * @param attribute
     * @returns {null|*}
     */
    getUser(attribute = null) {

        let user = this.req.user;

        if (!user) {
            return null;
        }

        if (attribute) {

            if (attribute in user) {
                return user[attribute];
            } else {
                return null;
            }
        }

        return user;
    }


    /**
     * get role object
     * @param attribute
     * @returns {null|*}
     */
    getRole(attribute = null) {

        let user = this.req.user;

        if (!user) {
            return null;
        }

        if ("role" in user) {

            let role = user.role;

            if(!role) {
                return null;
            }

            if (attribute) {

                if (attribute in role) {
                    return role[attribute];
                } else {
                    return null;
                }

            } else {
                return role;
            }
        }

        return null;
    }

    hasRole(name = false) {

        if (!name) {
            return false;
        }

        if (this.req.getRole("name") === name) {
            return true;
        }

        return false;
    }
}

export default new Index();
