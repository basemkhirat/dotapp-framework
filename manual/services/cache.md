# Cache Service

A rich service provides an easy way for caching built on `cacheman` package.

## Configuration

`config/cache.js` is the configuration file where you can modify cache drivers.

### Allowed drivers:
- memory: set cache values to memory.
- file: set cache values in `storage/cache` directory.
- redis: set cache values on redis server.

``` javascript
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
            path: process.cwd() + "/storage/cache"
        },

        redis: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: process.env.REDIS_PORT || 6379,
            database: process.env.REDIS_DB || 0,
            prefix: process.env.REDIS_PREFIX || "store",
            password: process.env.REDIS_PASS || undefined
        }
    }
}

```

## Usage

You can use cache service in promise-based or callback way.

``` javascript

import {Cache} from "dotapp/services";

 try {

    // set value to cache
    await Cache.set("users", "hi these are users....");

    // set a value to cache with ttl in `seconds`
    await Cache.set("users", "hi these are users....", 60);

    // You can also use humman readable values for ttl like: 1s, 1m, etc.
    // Check out the ms project for additional information on supported formats
    // https://github.com/vercel/ms
    await Cache.set("users", "hi these are users....", "1h");


    // get value from cache
    let users = await cache.get("users");

    // delete value from cache
    await cache.delete("users");

}catch(error) {
    return res.serverError(error);
}

Reference: https://www.npmjs.com/package/cacheman
