import path from 'path';
import fs from 'fs';
import merge from 'merge-deep';
import walkSync from 'walk-sync';
import dotenv from 'dotenv';

module.exports = new class {

    configurations = [];

    constructor() {

        const envConfig = dotenv.parse(fs.readFileSync(path.join(process.cwd(), '.env')));

        for (let k in envConfig) {
            process.env[k] = envConfig[k];
        }

        let configurations = [];

        let directory = path.join(process.cwd(), "config");

        walkSync(directory).forEach(function (file) {
            if (fs.statSync(path.join(directory, file)).isFile()) {
                configurations[path.parse(file).name] = require(path.join(directory, file)).default;
            }
        });

        let env_config_path = path.join(process.cwd(), "config/env/" + process.env.NODE_ENV);

        if (fs.existsSync(env_config_path + ".js")) {
            var env_config = require(env_config_path).default;
            configurations = merge(true, configurations, env_config);
        }

        this.configurations = configurations;
    }

    /**
     * get config value by key
     * @param name
     * @param defaultValue
     * @returns {*}
     */
    get(name, defaultValue) {

        try {
            var value = eval("this.configurations." + name);
        } catch (err) {
            return defaultValue;
        }

        if (value !== undefined) {
            return this.parseValue(value);
        }

        return defaultValue;
    }


    /**
     * detect value type
     * @param string
     * @returns {boolean|number}
     */
    parseValue(string) {
        switch (String(string).toLowerCase()) {
            case "true":
                return true;
            case "false":
                return false;
            case "null":
                return null;
            default:
                return !isNaN(string) && string !== "" ? Number(string) : string;
        }
    }

    all() {
        return this.configurations;
    }
};
