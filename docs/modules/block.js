export default {
    "/block": {
        get: {
            tags: ["Blocks"],
            summary: "Find all blocks",
            parameters: [
                {
                    name: "q",
                    in: "query",
                    description: "Search Keyword",
                    type: "string",
                },
                {
                    name: "page",
                    in: "query",
                    description: "Page Number",
                    type: "integer",
                    default: 1,
                },
                {
                    name: "limit",
                    in: "query",
                    description: "Records Count",
                    type: "integer",
                    default: 10,
                },
                {
                    name: "sort_field",
                    in: "query",
                    description: "Sorting Field",
                    type: "string",
                    default: "_id",
                },
                {
                    name: "sort_type",
                    in: "query",
                    description: "Sorting Direction",
                    type: "string",
                    default: "desc",
                },
                {
                    name: "type",
                    in: "query",
                    description: "Block type",
                    type: "string",
                    enum: ["post", "event"],
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        post: {
            tags: ["Blocks"],
            summary: "Create a new block",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    description: "Block name",
                    type: "string",
                    required: true,
                },
                {
                    name: "description",
                    in: "query",
                    description: "Block Description",
                    type: "string",
                },
                {
                    name: "type",
                    in: "query",
                    description: "Block type",
                    type: "string",
                    enum: ["post", "article", "event"],
                },
                {
                    name: "items",
                    in: "query",
                    description: "Block items",
                    type: "array",
                    items: {
                        type: "string",
                    },
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
        patch: {
            tags: ["Blocks"],
            summary: "Bulk blocks delete",
            parameters: [
                {
                    name: "operation",
                    in: "query",
                    description: "operation",
                    required: true,
                    type: "string",
                    enum: ["delete"],
                },
                {
                    name: "ids",
                    in: "query",
                    description: "IDs",
                    required: true,
                    type: "array",
                    items: {
                        type: "string",
                    },
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
    "/block/{id}": {
        get: {
            tags: ["Blocks"],
            summary: "Get block by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Block ID",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        put: {
            tags: ["Blocks"],
            summary: "Update block by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Block ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "name",
                    in: "query",
                    description: "Block Name",
                    type: "string",
                },
                {
                    name: "description",
                    in: "query",
                    description: "Block Description",
                    type: "string",
                },
                {
                    name: "type",
                    in: "query",
                    description: "Block type",
                    type: "string",
                    enum: ["post", "article", "event"],
                },
                {
                    name: "items",
                    in: "query",
                    description: "Block items",
                    type: "array",
                    items: {
                        type: "string",
                    },
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
        delete: {
            tags: ["Blocks"],
            summary: "Delete Block by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Block ID",
                    required: true,
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
    "/block/slug/{slug}": {
        get: {
            tags: ["Blocks"],
            summary: "Get block by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    description: "Block slug",
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
