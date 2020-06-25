export default {
    "/permission": {
        get: {
            tags: ["Permissions"],
            summary: "Get all system permissions",
            responses: {
                $ref: "#/responses",
            },
            security: [
                {
                    "bearer token": [],
                },
            ],
        },
    },
    "/permission/me": {
        get: {
            tags: ["Permissions"],
            summary: "Get current user permissions",
            responses: {
                $ref: "#/responses",
            },
            security: [
                {
                    "bearer token": [],
                },
            ],
        },
    },
};
