# Restfull API Documentation

DotApp provides an easy way to write your API endpoing using the swagger tool

## Configuration

`docs/index.js` is the configuration file where you can modify and add new API endpoints.


``` javascript

import auth from "~/docs/modules/auth";
import media from "~/docs/modules/media";
import user from "~/docs/modules/user";
import role from "~/docs/modules/role";
import permission from "~/docs/modules/permission";

export default {
    swagger: "2.0",
    info: {
        title: "DOTAPP",
        description: "The API documentation",
        version: "1.0.0",
    },
    basePath: "/api",
    paths: {
        ...auth,
        ...media,
        ...user,
        ...role,
        ...permission
    },
    securityDefinitions: {
        "bearer token": {
            type: "apiKey",
            name: "Authorization",
            in: "header",
        },
    },
    responses: {
        "200": {
            description: "Successful operation",
        },
        "401": {
            description: "Unauthenticated",
        },
        "403": {
            description: "Access denied",
        },
        "404": {
            description: "API not found",
        },
        "422": {
            description: "Validation error",
        },
        "429": {
            description: "Rate limit exceeded",
        },
        "500": {
            description: "Internal server error",
        },
    },
};
```
This is the result when browsing `http://localhost:3000/docs`.

![docs](/manual/images/docs.png)


Reference: https://swagger.io/tools/swagger-ui/
