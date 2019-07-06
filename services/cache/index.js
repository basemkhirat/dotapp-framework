import Cacheman from 'cacheman';
import Config from '~/services/config';
import Log from '~/services/log';

let options = {
    engine: Config.get("cache.default"),
    ttl: Config.get("cache.ttl")
};

let engine;

if (Config.get("cache.default") === "file") {

    options.tmpDir = Config.get("cache.engines.file.path");

    let CacheManFile = require('cacheman-file');

    engine = new CacheManFile(options);

} else if (Config.get("cache.default") === "redis") {

    options.host = Config.get("cache.engines.redis.host");
    options.port = Config.get("cache.engines.redis.port");
    options.password = Config.get("cache.engines.redis.password");
    options.database = Config.get("cache.engines.redis.database");
    options.prefix = Config.get("cache.engines.redis.prefix") + ":";

    let CacheManRedis = require('cacheman-redis');

    engine = new CacheManRedis(options);

} else {
    engine = new Cacheman(options);
}

Log.message("Cache engine: " + JSON.stringify(options), "info");

export default engine;

