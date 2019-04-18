import path from 'path';
import fs from 'fs';
import merge from 'merge-deep';
import walkSync from 'walk-sync';

class Index {

    configurations = [];

    constructor() {

        let configurations = [];

        var directory = path.join(process.cwd(), "config");

        walkSync(directory).forEach(function (file) {
            if (fs.statSync(path.join(directory, file)).isFile()) {
                configurations[path.parse(file).name] = require(path.join(directory, file)).default;
            }
        });

        var env_config_path = path.join(process.cwd(), "config/env/" + configurations.app.env);

        if (fs.existsSync(env_config_path + ".js")) {
            var env_config = require(env_config_path).default;
            configurations = merge(true, configurations, env_config);
        }

        this.configurations = configurations;
    }

    get(name, defaultValue) {

        try {
            var value = eval("this.configurations." + name);
        } catch (err) {
            return defaultValue;
        }

        return value != undefined ? value : defaultValue;
    }

}

export default new Index();
