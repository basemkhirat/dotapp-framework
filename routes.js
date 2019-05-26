export default {

    "/": {

        name: "home",

        handler: "HomeController.index",

        group: {

            "api": {

                group: {

                    "/auth": {

                        group: {
                            "POST /token": {
                                middleware: "validate:auth",
                                handler: "AuthController.token"
                            },
                            "GET /user": {
                                middleware: "authenticate",
                                handler: "AuthController.user"
                            }
                        }
                    },

                    "/user": {

                        middleware: "authenticate",

                        group: {
                            "GET /": "UserController.find",
                            "GET /:id": "UserController.findOne",
                            "POST /": {
                                middleware: "validate:user",
                                handler: "UserController.create"
                            },
                            "PUT /:id": {
                                middleware: "validate:user",
                                handler: "UserController.update"
                            },
                            "DELETE /:id": "UserController.destroy",
                            "PATCH /": "UserController.bulk"
                        }
                    },


                    "/permission": {

                        middleware: "authenticate",

                        group: {
                            "GET /": "PermissionController.find",
                            "GET /me": "PermissionController.me",
                        }
                    },


                    "/media": {

                        middleware: "authenticate",

                        group: {
                            "GET /": "MediaController.find",
                            "GET /thumbnails": "MediaController.findThumbnails",
                            "GET /types": "MediaController.findTypes",
                            "GET /extensions": "MediaController.findExtensions",
                            "GET /:id": "MediaController.findOne",
                            "POST /": "MediaController.create",
                            "PUT /thumbnail/:id": "MediaController.updateThumbnail",
                            "PUT /:id": "MediaController.update",
                            "DELETE /:id": "MediaController.destroy",
                            "PATCH /": "MediaController.bulk"
                        }
                    },

                    "/role": {

                        middleware: "authenticate",

                        group: {
                            "GET /": "RoleController.find",
                            "GET /:id": "RoleController.findOne",
                            "POST /": {
                                middleware: "validate:role",
                                handler: "RoleController.create"
                            },
                            "PUT /:id": {
                                middleware: "validate:role",
                                handler: "RoleController.update"
                            },
                            "DELETE /:id": "RoleController.destroy",
                            "PATCH /": "RoleController.bulk"
                        }
                    },

                    "/category": {

                        middleware: "authenticate",

                        group: {
                            "GET /": "CategoryController.find",
                            "GET /:id": "CategoryController.findOne",
                            "POST /": {
                                middleware: "validate:category",
                                handler: "CategoryController.create"
                            },
                            "PUT /:id": {
                                middleware: "validate:category",
                                handler: "CategoryController.update"
                            },
                            "DELETE /:id": "CategoryController.destroy",
                            "PATCH /": "CategoryController.bulk"
                        }
                    },

                    "/tag": {

                        middleware: "authenticate",

                        group: {
                            "GET /": "TagController.find",
                            "GET /:id": "TagController.findOne",
                            "POST /": {
                                middleware: "validate:tag",
                                handler: "TagController.create"
                            },
                            "PUT /:id": {
                                middleware: "validate:tag",
                                handler: "TagController.update"
                            },
                            "DELETE /:id": "TagController.destroy",
                            "PATCH /": "TagController.bulk"
                        }
                    }

                }
            }
        }
    }
}
