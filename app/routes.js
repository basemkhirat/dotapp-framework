export default {

    "/": {

        name: "home",

        handler: "HomeController.index",

        group: {

            "api": {

                middleware: "authenticate",

                group: {

                    "/auth": {
                        group: {
                            "POST /token": "AuthController.token"
                        }
                    },

                    "/user": {

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

                    "/role": {

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
