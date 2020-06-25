import { authenticate } from "dotapp/middlewares";

export default {
    "/auth": {
        group: {
            "POST /token": {
                handler: "v1/AuthController.token",
            },
            "POST /register": {
                handler: "v1/AuthController.register",
            },
            "POST /profile": {
                middleware: authenticate(),
                handler: "v1/AuthController.profile",
            },
            "POST /repassword": {
                middleware: authenticate(),
                handler: "v1/AuthController.repassword",
            },
            "POST /facebook": {
                handler: "v1/AuthController.facebook",
            },
            "POST /google": {
                handler: "v1/AuthController.google",
            },
            "POST /forgot": {
                handler: "v1/AuthController.forgot",
            },
            "POST /reset": {
                handler: "v1/AuthController.reset",
            },
            "POST /verify": {
                handler: "v1/AuthController.verify",
            },
            "GET /user": {
                middleware: authenticate(),
                handler: "v1/AuthController.user",
            },
        },
    },

    "/user": {
        group: {
            "POST /": {
                handler: "v1/UserController.create",
            },
            "GET /": {
                middleware: authenticate(),
                handler: "v1/UserController.find",
            },
            "GET /:id": {
                handler: "v1/UserController.findOne",
            },
            "PUT /:id": {
                middleware: [authenticate()],
                handler: "v1/UserController.update",
            },
            "DELETE /:id": {
                middleware: authenticate(),
                handler: "v1/UserController.destroy",
            },
        },
    },

    "/permission": {
        middleware: authenticate(),

        group: {
            "GET /": "v1/PermissionController.find",
            "GET /me": "v1/PermissionController.me",
        },
    },

    "/media": {
        group: {
            "GET /": "v1/MediaController.find",
            "GET /thumbnails":
                "v1/MediaController.findThumbnails",
            "GET /types":
                "v1/MediaController.findTypes",
            "GET /extensions":
                "v1/MediaController.findExtensions",
            "GET /:id": "v1/MediaController.findOne",
            "POST /": {
                middleware: authenticate(),
                handler: "v1/MediaController.create",
            },
            "PUT /thumbnail/:id": {
                middleware: authenticate(),
                handler:
                    "v1/MediaController.updateThumbnail",
            },
            "PUT /:id": {
                middleware: authenticate(),
                handler: "v1/MediaController.update",
            },
            "DELETE /:id": {
                middleware: authenticate(),
                handler: "v1/MediaController.destroy",
            },
        },
    },

    "/role": {
        middleware: authenticate(),
        group: {
            "GET /": "v1/RoleController.find",
            "GET /:id": "v1/RoleController.findOne",
            "POST /": "v1/RoleController.create",
            "PUT /:id": "v1/RoleController.update",
            "DELETE /:id": "v1/RoleController.destroy",
        },
    },
};
