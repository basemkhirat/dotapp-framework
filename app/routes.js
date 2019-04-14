export default {
    "/": {
        middleware: "authorize:readPost",
        handler: "HomeController.index",
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
                    "POST /": "UserController.create",
                    "PUT /:id": "UserController.update",
                    "DELETE /:id": "UserController.destory",
                }

            },

            "/role": {
                group: {
                    "GET /": "RoleController.find",
                    "GET /:id": "RoleController.findOne",
                    "POST /": "RoleController.create",
                    "PUT /:id": "RoleController.update",
                    "DELETE /:id": "RoleController.destory",
                }
            }
        }
    }
}
