import { authenticate } from "dotapp/middlewares";

export default {
    "/": {
        name: "home",

        handler: "HomeController.index",

        group: {
            "/api": {
                group: {
                    "/auth": {
                        group: {
                            "POST /token": {
                                handler: "AuthController.token",
                            },
                            "POST /register": {
                                handler: "AuthController.register",
                            },
                            "POST /profile": {
                                middleware: authenticate(),
                                handler: "AuthController.profile",
                            },
                            "POST /repassword": {
                                middleware: authenticate(),
                                handler: "AuthController.repassword",
                            },
                            "POST /facebook": {
                                handler: "AuthController.facebook",
                            },
                            "POST /google": {
                                handler: "AuthController.google",
                            },
                            "POST /forgot": {
                                handler: "AuthController.forgot",
                            },
                            "POST /reset": {
                                handler: "AuthController.reset",
                            },
                            "POST /verify": {
                                handler: "AuthController.verify",
                            },
                            "GET /user": {
                                middleware: authenticate(),
                                handler: "AuthController.user",
                            },
                        },
                    },

                    "/user": {
                        group: {
                            "POST /": {
                                handler: "UserController.create",
                            },
                            "GET /": {
                                middleware: authenticate(),
                                handler: "UserController.find",
                            },
                            "GET /:id": {
                                handler: "UserController.findOne",
                            },
                            "PUT /:id": {
                                middleware: [authenticate()],
                                handler: "UserController.update",
                            },
                            "DELETE /:id": {
                                middleware: authenticate(),
                                handler: "UserController.destroy",
                            },
                        },
                    },

                    "/permission": {
                        middleware: authenticate(),

                        group: {
                            "GET /": "PermissionController.find",
                            "GET /me": "PermissionController.me",
                        },
                    },

                    "/media": {
                        group: {
                            "GET /": "MediaController.find",
                            "GET /thumbnails": "MediaController.findThumbnails",
                            "GET /types": "MediaController.findTypes",
                            "GET /extensions": "MediaController.findExtensions",
                            "GET /:id": "MediaController.findOne",
                            "POST /": {
                                middleware: authenticate(),
                                handler: "MediaController.create",
                            },
                            "PUT /thumbnail/:id": {
                                middleware: authenticate(),
                                handler: "MediaController.updateThumbnail",
                            },
                            "PUT /:id": {
                                middleware: authenticate(),
                                handler: "MediaController.update",
                            },
                            "DELETE /:id": {
                                middleware: authenticate(),
                                handler: "MediaController.destroy",
                            },
                        },
                    },

                    "/role": {
                        middleware: authenticate(),

                        group: {
                            "GET /": "RoleController.find",
                            "GET /:id": "RoleController.findOne",
                            "POST /": {
                                handler: "RoleController.create",
                            },
                            "PUT /:id": {
                                handler: "RoleController.update",
                            },
                            "DELETE /:id": "RoleController.destroy",
                        },
                    },
                },
            },
        },
    },
};
