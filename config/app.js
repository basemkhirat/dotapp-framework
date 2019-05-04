export default {

    /**
     * The application base url
     */

    url: process.env.APP_URL || 'http://localhost',

    /**
     * The application base url
     */

    debug: process.env.APP_DEBUG || true,

    /**
     * The `port` setting determines which TCP port your app will be deployed on.
     */

    port: process.env.APP_PORT || 3000,

    /**
     * Enabling trust proxy will have the following impact:
     * The value of req.hostname is derived from the value set in the X-Forwarded-Host header,
     * which can be set by the client or by the proxy. X-Forwarded-Proto can be set by the
     * reverse proxy to tell the app whether it is https or http or even an invalid name.
     * This value is reflected by req.protocol.
     * The req.ip and req.ips values are populated with the list of addresses from X-Forwarded-For.
     */

    trust_proxy: process.env.APP_PROXY || false,

    /**
     * View engine to use for your app's server-side views
     */

    view_engine: "ejs",

    /**
     * The views directory path
     */

    views: "views",
};

