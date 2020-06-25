import path from "path";

export default {

    /**
     * this option controls the default cache connection that gets used while
     * using this caching library. This connection is used when another is
     * not explicitly specified when executing a given caching function.
     * Available engines: memory, file and redis
     */

    default: process.env.CACHE_DRIVER || "memory",

    /**
     * default "Time To Live" in seconds
     */

    ttl: process.env.CACHE_TTL || 60,

    /**
     * here you may define all of the cache "engines" for your application
     */

    engines: {

        file: {
            path: path.join(process.cwd(), "/storage/cache")
        },

        redis: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: process.env.REDIS_PORT || 6379,
            database: process.env.REDIS_DB || 0,
            prefix: process.env.REDIS_PREFIX || "store",
            password: process.env.REDIS_PASS || undefined
        }
    }
}
