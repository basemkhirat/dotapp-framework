import auth from "~/docs/v1/modules/auth";
import media from "~/docs/v1/modules/media";
import user from "~/docs/v1/modules/user";
import role from "~/docs/v1/modules/role";
import permission from "~/docs/v1/modules/permission";

export default {
    swagger: "2.0",
    info: {
        title: "DOTAPP",
        description: "The API documentation",
        version: "1.0.0",
    },
    basePath: "/api/v1",
    paths: {
        ...auth,
        ...media,
        ...user,
        ...role,
        ...permission,
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
