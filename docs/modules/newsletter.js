export default {
    "/newsletter/subscribe": {
        post: {
            tags: ["Newsletter"],
            summary: "Subscribe an email",
            parameters: [
                {
                    name: "email",
                    in: "query",
                    description: "Email",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },
    "/newsletter/unsubscribe": {
        post: {
            tags: ["Newsletter"],
            summary: "unsubscribe an email",
            parameters: [
                {
                    name: "email",
                    in: "query",
                    description: "Email",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },
};
