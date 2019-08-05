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
                            "POST /forget": {
                                handler: "AuthController.forget"
                            },
                            "POST /reset": {
                                middleware: "validate:reset_password",
                                handler: "AuthController.reset"
                            },
                            "POST /verify": {
                                handler: "AuthController.verify"
                            },
                            "GET /user": {
                                middleware: "authenticate",
                                handler: "AuthController.user"
                            }
                        }
                    },

                    "/user": {

                        group: {

                            "POST /": {
                                middleware: "validate:user",
                                handler: "UserController.create"
                            },
                            "GET /": {
                                middleware: ["authenticate"],
                                handler: "UserController.find"
                            },
                            "GET /:id": {
                                handler: "UserController.findOne"
                            },
                            "PUT /:id": {
                                middleware: ["authenticate", "validate:user"],
                                handler: "UserController.update"
                            },
                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "UserController.destroy"
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "UserController.bulk"
                            }
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

                        group: {
                            "GET /": "MediaController.find",
                            "GET /thumbnails": "MediaController.findThumbnails",
                            "GET /types": "MediaController.findTypes",
                            "GET /extensions": "MediaController.findExtensions",
                            "GET /:id": "MediaController.findOne",
                            "POST /": {
                                middleware: ["authenticate"],
                                handler: "MediaController.create"
                            },
                            "PUT /thumbnail/:id": {
                                middleware: ["authenticate"],
                                handler: "MediaController.updateThumbnail"
                            },
                            "PUT /:id": {
                                middleware: ["authenticate"],
                                handler: "MediaController.update"
                            },
                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "MediaController.destroy"
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "MediaController.bulk"
                            }

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

                        group: {

                            "GET /": "CategoryController.find",
                            "GET /:id": "CategoryController.findOne",
                            "GET /slug/:slug": "CategoryController.findBySlug",

                            "POST /": {
                                middleware: ["authenticate", "validate:category"],
                                handler: "CategoryController.create"
                            },

                            "PUT /:id": {
                                middleware: ["authenticate", "validate:category"],
                                handler: "CategoryController.update"
                            },
                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "CategoryController.destroy"
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "CategoryController.bulk"
                            }
                        }
                    },

                    "/place": {

                        group: {
                            "GET /": "PlaceController.find",
                            "GET /search": "PlaceController.search",
                            "GET /:id": "PlaceController.findOne",
                            "GET /slug/:slug": "PlaceController.findBySlug",

                            "POST /": {
                                middleware: ["authenticate", "validate:place"],
                                handler: "PlaceController.create"
                            },

                            "PUT /:id": {
                                middleware: ["authenticate", "validate:place"],
                                handler: "PlaceController.update"
                            },
                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "PlaceController.destroy"
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "PlaceController.bulk"
                            }
                        }
                    },

                    "/author": {

                        group: {

                            "GET /": "AuthorController.find",
                            "GET /:id": "AuthorController.findOne",
                            "GET /slug/:slug": "AuthorController.findBySlug",

                            "POST /": {
                                middleware: ["authenticate", "validate:author"],
                                handler: "AuthorController.create"
                            },

                            "PUT /:id": {
                                middleware: ["authenticate", "validate:author"],
                                handler: "AuthorController.update"
                            },
                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "AuthorController.destroy"
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "AuthorController.bulk"
                            }
                        }
                    },

                    "/block": {

                        group: {

                            "GET /": "BlockController.find",
                            "GET /:id": "BlockController.findOne",
                            "GET /slug/:slug": "BlockController.findBySlug",

                            "POST /": {
                                middleware: ["authenticate", "validate:block"],
                                handler: "BlockController.create"
                            },

                            "PUT /:id": {
                                middleware: ["authenticate", "validate:block"],
                                handler: "BlockController.update"
                            },

                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "BlockController.destroy"
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "BlockController.bulk"
                            }
                        }

                    },

                    "/tag": {

                        group: {

                            "GET /": "TagController.find",
                            "GET /:id": "TagController.findOne",
                            "GET /name/:name": "TagController.findByName",

                            "POST /": {
                                middleware: ["authenticate", "validate:tag"],
                                handler: "TagController.create"
                            },

                            "PUT /:id": {
                                middleware: ["authenticate", "validate:tag"],
                                handler: "TagController.update"
                            },

                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "TagController.destroy"
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "TagController.bulk"
                            }
                        }
                    },

                    "/post": {

                        group: {

                            "GET /": "PostController.find",
                            "GET /formats": "PostController.findFormats",
                            "GET /:id": "PostController.findOne",
                            "GET /slug/:slug": "PostController.findBySlug",

                            "POST /": {
                                middleware: ["authenticate", "validate:post"],
                                handler: "PostController.create"
                            },
                            "PUT /:id": {
                                middleware: ["authenticate", "validate:post"],
                                handler: "PostController.update"
                            },
                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "PostController.destroy",
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "PostController.bulk"
                            },
                            "PUT /like/:id": {
                                middleware: ["authenticate"],
                                handler: "PostController.like"
                            },
                            "PUT /follow/:id": {
                                middleware: ["authenticate"],
                                handler: "PostController.follow"
                            },
                            "PUT /comment/:id": {
                                middleware: ["authenticate"],
                                handler: "PostController.comment"
                            }

                        }
                    },

                    "/page": {

                        group: {

                            "GET /": "PageController.find",
                            "GET /:id": "PageController.findOne",
                            "GET /slug/:slug": "PageController.findBySlug",

                            "POST /": {
                                middleware: ["authenticate", "validate:page"],
                                handler: "PageController.create"
                            },
                            "PUT /:id": {
                                middleware: ["authenticate", "validate:page"],
                                handler: "PageController.update"
                            },
                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "PageController.destroy",
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "PageController.bulk"
                            }
                        }
                    },

                    "/event": {

                        group: {

                            "GET /": "EventController.find",

                            "GET /likes/me": {
                                middleware: ["authenticate"],
                                handler: "EventController.my_likes"
                            },

                            "GET /registrations/me": {
                                middleware: ["authenticate"],
                                handler: "EventController.my_registrations"
                            },

                            "GET /:id": "EventController.findOne",
                            "GET /slug/:slug": "EventController.findBySlug",

                            "POST /": {
                                middleware: ["authenticate", "validate:event"],
                                handler: "EventController.create"
                            },
                            "PUT /:id": {
                                middleware: ["authenticate", "validate:event"],
                                handler: "EventController.update"
                            },
                            "DELETE /:id": {
                                middleware: ["authenticate"],
                                handler: "EventController.destroy"
                            },
                            "PATCH /": {
                                middleware: ["authenticate"],
                                handler: "EventController.bulk"
                            },
                            "PUT like/:id": {
                                middleware: ["authenticate"],
                                handler: "EventController.like"
                            },
                            "PUT follow/:id": {
                                middleware: ["authenticate"],
                                handler: "EventController.follow"
                            },
                            "PUT register/:id": {
                                middleware: ["validate:registeration"],
                                handler: "EventController.register"
                            }
                        }
                    },

                    "/meta": {
                        group: {
                            "GET /:type?/:id?": "MetaController.find",
                        }
                    },

                    "/newsletter": {
                        group: {
                            "POST /subscribe": "NewsletterController.subscribe",
                            "POST /unsubscribe": "NewsletterController.unsubscribe",
                        }
                    },

                    "GET /weather": "WeatherController.index"
                }
            }
        }
    }
}
