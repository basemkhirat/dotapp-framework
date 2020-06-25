export default {

    /**
     * Enable hits limiter by default using below max and windowMs values.
     * if global is enabled, rates will be applied on all endpoints.
     */

    global: false,

    /**
     * Max number of connections during windowMs milliseconds before sending a 429 response.
     * May be a number, or a function that returns a number or a promise
     * Defaults to 5. Set to 0 to disable.
     */

    max: 1000,

    /**
     * How long in milliseconds to keep records of requests in memory.
     * Defaults to 60000 (1 minute).
     */

    windowMs: 60000,

    /**
     * Enable headers for request limit (X-RateLimit-Limit) and current usage (X-RateLimit-Remaining)
     * on all responses and time to wait before retrying (Retry-After) when max is exceeded.
     * Defaults to true.
     */

    headers: true,

    /**
     * Function used to generate keys.
     * Defaults to req.ip:
     * @param req
     * @returns {*}
     */

    keyGenerator:function (req /*, res*/) {
        return req.ipAddress();
    },

    /**
     * The function to handle requests once the max limit is exceeded.
     * It receives the request and the response objects.
     * The "next" param is available if you need to pass to the next middleware.
     * The req.rateLimit object has limit, current, and remaining number of requests and,
     * if the store provides it, a resetTime Date object.
     * @param req
     * @param res
     */

    handler: function (req, res, /*next*/) {
        res.error(req.lang("messages.rate_limit_exceeded"), 429);
    },

    /**
     * When set to true, failed requests won't be counted. Request considered failed when:response status >= 400
     * requests that were cancelled before last chunk of data was sent (response close event triggered)
     * response error event was triggrered by response (Technically they are counted and then un-counted,
     * so a large number of slow requests all at once could still trigger a rate-limit.
     * This may be fixed in a future release.)
     */

    skipFailedRequests: false,

    /**
     * Function used to skip requests. Returning true from the function will skip limiting for that request.
     * Defaults to always false (count all requests):
     */

    skip: function (/*req, res*/) {
        return false;
    }
};
