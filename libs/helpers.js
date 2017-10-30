var path = require("path");
var fs = require("fs");
var walkSync = require("./walkSync");
var merge = require("./merge");

app.loadConfig = function () {

    global._config = {};

    var directory = path.join(__basepath, "config");

    var config = walkSync(directory);

    config.forEach(function (file) {
        _config[file] = require(path.join(directory, file));
    });

    var env_config_path = path.join(__basepath, "config/env/" + _config.app.env);

    if (fs.existsSync(env_config_path + ".js")) {
        var env_config = require(env_config_path);
        _config = merge.recursive(true, _config, env_config);
    }
};

app.loadControllers = function () {

    var directory = path.join(__basepath, "app/controllers");

    var files = walkSync(directory);

    var controllers = {};

    files.forEach(function (file) {
        controllers[file] = require(path.join(directory, file));
    });

    if (_config.globals.controllers) {
        for (var module in controllers) {
            global[module] = controllers[module];
        }
    }

    app.controllers = {};

    for (var module in controllers) {
        app.controllers[module] = controllers[module];
    }
};

app.loadModels = function () {

    var directory = path.join(__basepath, "app/models");

    var files = walkSync(directory);

    var models = {};

    files.forEach(function (file) {
        models[file] = require(path.join(directory, file));
    });

    if (_config.globals.models) {
        for (var module in models) {
            global[module] = models[module];
        }
    }

    app.models = {};

    for (var module in models) {
        app.models[module] = models[module];
    }
};

app.loadMiddlewares = function () {

    var directory = path.join(__basepath, "app/middlewares");

    var files = walkSync(directory);

    var middlewares = {};

    files.forEach(function (file) {
        middlewares[file] = require(path.join(directory, file));
    });

    if (_config.globals.middlewares) {
        for (var module in middlewares) {
            global[module] = middlewares[module];
        }
    }

    app.middlewares = {};

    for (var module in middlewares) {
        app.middlewares[module] = middlewares[module];
    }
};

app.loadServices = function () {

    app.use(function (req, res, next) {

        var directory = path.join(__basepath, "app/services");

        var files = walkSync(directory);

        var services = {};

        files.forEach(function (file) {
            services[file] = require(path.join(directory, file));
        });

        if (_config.globals.services) {
            for (var module in services) {
                global[module] = services[module];
            }
        }

        app.services = {};

        for (var module in services) {
            app.services[module] = services[module];
        }

        next();
    });
};


app.loadResponses = function () {

    app.use(function (req, res, next) {

        var directory = path.join(__basepath, "app/responses");

        var responses = walkSync(directory);

        responses.forEach(function (file) {
            this.req = req, this.res = res;
            res[file] = require(path.join(directory, file)).bind(this);
        });

        next();
    });
}


