export default {
    "/weather": {
        get: {
            tags: ["Weather"],
            summary: "Get weather data",
            parameters: [
                {
                    name: "city",
                    in: "query",
                    description: "City",
                    required: true,
                    type: "string",
                },
                {
                    name: "lang",
                    in: "query",
                    description: "lang",
                    type: "string",
                    enum: ["ar", "en"],
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },
};
