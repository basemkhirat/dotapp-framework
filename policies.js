export default {

    user: {

        view: true,

        /**
         * users allowed to update:
         * - super admins
         * - users have user.update permission
         * - users can update themselves
         * @param req
         * @param user
         * @returns {boolean}
         */
        update: (req, user) => {
            return req.role === 'superadmin' || req.hasPermission("user.update") || req.user.id === user.id;
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
        delete: (req, user) => {
            return (req.role === 'superadmin' || req.hasPermission("user.delete")) && req.user.id !== user.id;
        }
    },

    role: req => req.role === 'superadmin',
}
