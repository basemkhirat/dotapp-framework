export default {

    view: true,

    create(req) {
        return req.hasRole("superadmin");
    },

    update(req) {
        return req.hasRole("superadmin");
    },

    delete(req) {
        return req.hasRole("superadmin");
    },
};
