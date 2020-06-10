export default {
    "/match": {
        get: {
            tags: ["Matches"],
            summary: "Get daily matches",
            parameters: [
                {
                    name: "date",
                    in: "query",
                    description: "Date",
                    required: false,
                    type: "string",
                    value: "2019-10-16",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },
};
