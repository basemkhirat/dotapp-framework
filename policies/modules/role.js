export default {
    view(req) {
        return req.hasRole("superadmin");
    },

    create(req) {
        return req.hasRole("superadmin");
    },

    update(req, role) {
        return req.hasRole("superadmin") && role.name !== "superadmin";
    },

    delete(req, role) {
        return req.hasRole("superadmin") && role.name !== "superadmin";
    },
};
