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

        update: (req, user) => req.role === 'superadmin' || req.hasPermission("user.update") || req.user.id === user.id,

        /**
         * users allowed to change status:
         * - super admins and cannot change status of themselves
         * - users have user.status permission and cannot change status of themselves
         * -
         * @param req
         * @param user
         * @returns {boolean}
         */

        status: (req, user) => (req.role === 'superadmin' || req.hasPermission("user.status")) && req.user.id !== user.id,

        /**
         * users allowed to delete:
         * - super admins and cannot delete themselves
         * - users have user.delete permission and cannot delete themselves
         * -
         * @param req
         * @param user
         * @returns {boolean}
         */

        delete: (req, user) => (req.role === 'superadmin' || req.hasPermission("user.delete")) && req.user.id !== user.id,
    },

    role: req => req.role === 'superadmin',
}
