import auth from "~/docs/modules/auth";
import media from "~/docs/modules/media";
import user from "~/docs/modules/user";
import role from "~/docs/modules/role";
import author from "~/docs/modules/author";
import block from "~/docs/modules/block";
import category from "~/docs/modules/category";
import event from "~/docs/modules/event";
import match from "~/docs/modules/match";
import meta from "~/docs/modules/meta";
import newsletter from "~/docs/modules/newsletter";
import page from "~/docs/modules/page";
import permission from "~/docs/modules/permission";
import place from "~/docs/modules/place";
import post from "~/docs/modules/role";
import tag from "~/docs/modules/tag";

export default  {
    swagger: "2.0",
    info: {
        title: "CMS",
        description: "The API documentation",
        version: "1.0.0",
    },
    basePath: "/api",
    paths: {
        ...auth,
        ...media,
        ...user,
        ...role,
        ...author,
        ...block,
        ...category,
        ...event,
        ...match,
        ...meta,
        ...newsletter,
        ...page,
        ...permission,
        ...place,
        ...post,
        ...tag,
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
