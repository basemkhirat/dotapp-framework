export default {
    "/meta/{type}/{id}": {
        get: {
            tags: ["Meta"],
            summary: "Get Meta parameters",
            parameters: [
                {
                    name: "type",
                    in: "path",
                    description: "Module type",
                    type: "string",
                    enum: ["home", "event", "post", "category"],
                },
                {
                    name: "id",
                    in: "path",
                    description: "Module object ID",
                    type: "string",
                },
            ],
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
