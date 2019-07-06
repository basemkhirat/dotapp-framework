import express from "express";
import fs from 'fs';
import path from "path";

export default new class {

    /**
     * all routes
     * @type {Array}
     */
    rs = [];

    constructor() {
        this.router = express.Router();
    }

    /**
     * Route handler
     * @param route
     * @param routes
     * @param parent
     */
    route(route, routes, parent = false) {

        let r = {};

        let path_parts = route.replace(/\s\s+/g, ' ').split(' ');
        let path = parent ? parent.path + this.parsePath(path_parts) : this.parsePath(path_parts);

        let method = this.parseMethod(path_parts);

        if (parent) {
            if (parent.method !== "all") {
                method = parent.method;
            }
        }

        r.path = path.replace("//", "/");
        r.middleware = parent ? parent.middleware : [];
        r.method = method;
        r.parent = parent;

        let routeGroup = false;

        let value = routes[route];

        if (typeof value === "function") {
            r.handler = value;
        } else if (typeof value === "string") {
            r.handler = this.parseHandler(value);
        } else if (typeof value === "object") {
            r.handler = this.parseHandler(value.handler);
            r.middleware = [...r.middleware, ...this.parseMiddleware(value.middleware)];
            r.name = value.name;
            routeGroup = this.parseGroup(value);
        }

        delete r.parent;

        this.rs.push(r);

        if (r.handler) {
            this.translate({
                method: r.method,
                path: r.path,
                handler: r.handler,
                middleware: r.middleware
            });
        }

        if (routeGroup) {
            for (let child_r in routeGroup) {
                this.route(child_r, routeGroup, r)
            }
        }
    }

    /**
     * express routes conversion
     * @param routes
     */
    map(routes = {}) {

        for (let route in routes) {
            this.route(route, routes)
        }

        return this.router;
    }

    /**
     * get route method
     * @param path_parts
     * @returns {string}
     */
    parseMethod(path_parts) {
        return path_parts.length === 1 ? "all" : path_parts[0].toLocaleLowerCase();
    }

    /**
     * get route path
     * @param path_parts
     * @returns {string}
     */
    parsePath(path_parts) {
        let path = path_parts.length === 1 ? path_parts[0] : path_parts[1];
        return path.startsWith('/') ? path : '/' + path;
    }

    /**
     * get route group
     * @param value
     * @returns {*}
     */
    parseGroup(value) {

        if (typeof value.group === 'function') {
            return value.group.call(value, value);
        }

        return value.group;
    }

    /**
     * get route middleware
     * @param value
     * @returns {Array}
     */
    parseMiddleware(value) {

        if (typeof value === "undefined") {
            return [];
        }

        let middlewares = Array.isArray(value) ? value : [value];

        let m = [];

        middlewares.forEach((value) => {

            if (typeof value === 'function') {
                m.push(value);
            }

            if (typeof value === "string") {

                let [middleware, args] = value.split(":");

                let params = [];

                if (args != undefined) {
                    params = args.split(",").map((param) => {
                        return param.trim();
                    });
                }

                middleware = path.join(process.cwd(), "middlewares/" + middleware + ".js");

                if (fs.existsSync(middleware)) {

                    let middleware_object = require(middleware).default;

                    m.push(middleware_object.apply(this, params));
                }
            }

        });

        return m;
    }

    /**
     * get route handler function
     * @param value
     * @returns {boolean|Function}
     */
    parseHandler(value) {

        if (typeof value === 'function') {
            return value;
        }

        let handler = false;

        if (value === undefined) {
            return handler;
        }

        let [controller, method] = value.split(".");
        controller = path.join(process.cwd(), "controllers/" + controller + ".js")
        method = method ? method : "index";

        if (fs.existsSync(controller)) {

            let controller_object = require(controller);

            if (controller_object.default) {

                controller_object = controller_object.default;

                controller_object = new controller_object;

                if (typeof controller_object[method] !== "undefined") {
                    handler = controller_object[method].bind(controller_object);
                }
            }
        }

        return handler;
    }

    /**
     * pass data to express router
     * @param method
     * @param path
     * @param handler
     * @param middleware
     */
    translate({method, path, handler, middleware}) {
        this.router.route(path)[method](middleware, handler);
    }

    /**
     * get route url by route name
     * @param name
     * @param params
     * @returns {boolean|*}
     */
    name(name, params = {}) {

        let route = this.rs.filter(route => route.name === name);

        if (route.length) {

            let path = route[0].path;
            let query_string = [];

            for (let param in params) {

                if (path.indexOf(":" + param) > -1) {
                    path = path.replace(":" + param + "?", params[param]);
                    path = path.replace(":" + param, params[param]);
                } else {
                    query_string.push(param + "=" + params[param]);
                }
            }

            if (query_string.length) {
                query_string = "?" + query_string.join("&");
            }

            path = path + query_string;

            if (path) {
                return Config.get("app.url") + "/" + path.replace(/^\/|\/$/g, '');
            }

            return false;
        }

        return false;
    }

    /**
     * get all routes
     * @returns {Array}
     */
    all() {
        return this.rs;
    }
}

