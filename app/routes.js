export default {
    "/": {
        name: "home",
        handler: "HomeController.index",
        group: {
            "/auth": {
                group: {
                    "POST /token": "AuthController.token"
                }
            },
            "/user": {
                middleware: "auth",
                group: {
                    "GET /": "UserController.find",
                    "GET /:id": "UserController.findOne",
                    "POST /": "UserController.create",
                    "PUT /:id": "UserController.update",
                    "DELETE /:id": "UserController.destory",
                }
            }
        }
    }
}
