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

                      //  middleware: "authenticate",

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
                        }
                    },


                    "/media": {

                       // middleware: "authenticate",

                        group: {
                            "GET /": "MediaController.find",
                            "GET /:id": "MediaController.findOne",
                            "POST /": "MediaController.create",
                            "PUT /:id": "MediaController.update",
                            "DELETE /:id": "MediaController.destroy",
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
                        }
                    },

                    "/post": {

                        middleware: "authenticate",

                        group: {
                            "GET /": "PostController.find",
                            "GET /:id": "PostController.findOne",
                            "POST /": {
                                middleware: "validate:post",
                                handler: "PostController.create"
                            },
                            "PUT /:id": {
                                middleware: "validate:post",
                                handler: "PostController.update"
                            },
                            "DELETE /:id": "PostController.destroy",
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
                        }
                    }

                }
            }
        }
    }
}
