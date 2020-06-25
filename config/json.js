export default {
    /**
     * When set to true, then deflated (compressed) bodies will be inflated; when false,
     * deflated bodies are rejected. Defaults to true.
     */

    inflate: true,

    /**
     * Controls the maximum request body size. If this is a number,
     * then the value specifies the number of bytes; if it is a string,
     * the value is passed to the bytes library for parsing. Defaults to '100kb'.
     */

    limit: "100mb",

    /**
     * When set to true, will only accept arrays and objects;
     * when false will accept anything JSON.parse accepts. Defaults to true.
     */

    strict: true,

    /**
     * The type option is used to determine what media type the middleware will parse.
     * This option can be a string, array of strings, or a function.
     * If not a function, type option is passed directly to the type-is library and
     * this can be an extension name (like json), a mime type (like application/json),
     * or a mime type with a wildcard.
     * If a function, the type option is called as fn(req) and the request is parsed
     * if it returns a truthy value. Defaults to application/json.
     */

    type: "application/json",
};
