export default {

    user: {

        /**
         * users allowed to update:
         * - super admins
         * - users have user.update permission
         * - users can update themselves
         * @param req
         * @param user
         * @returns {boolean}
         */

        update: (req, user = false) => req.role === 'superadmin' || req.hasPermission("user.update") || req.user.id === user.id,

        /**
         * users allowed to change status:
         * - super admins and cannot change status of themselves
         * - users have user.status permission and cannot change status of themselves
         * -
         * @param req
         * @param user
         * @returns {boolean}
         */

        status: (req, user = false) => {

            if (user && user.status === req.param("status")) { // status not changed
                return true;
            }

            return (req.role === 'superadmin' || req.hasPermission("user.status")) && req.user.id !== user.id
        },

        /**
         * users allowed to change role:
         * - super admins and cannot change role of themselves
         * - users have user.role permission and cannot change role of themselves
         * -
         * @param req
         * @param user
         * @returns {boolean}
         */

        role: (req, user = false) => {

            if (user && user.role && user.role.id === req.param("role")) { // role not changed
                return true;
            }

            return (req.role === 'superadmin' || req.hasPermission("user.role")) && req.user.id !== user.id
        },

        /**
         * users allowed to change permissions:
         * - super admins and cannot change permissions of themselves
         * - users have user.permissions permission and cannot change permissions of themselves
         * -
         * @param req
         * @param user
         * @returns {boolean}
         */

        permissions: (req, user = false) => {

            if (user && user.permissions === req.param("permissions")) { // permissions not changed
                return true;
            }

            return (req.role === 'superadmin' || req.hasPermission("user.permissions")) && req.user.id !== user.id;
        },

        /**
         * users allowed to delete:
         * - super admins and cannot delete themselves
         * - users have user.delete permission and cannot delete themselves
         * -
         * @param req
         * @param user
         * @returns {boolean}
         */

        delete: (req, user = false) => (req.role === 'superadmin' || req.hasPermission("user.delete")) && req.user.id !== user.id,
    },

    role: req => req.role === 'superadmin',
}
