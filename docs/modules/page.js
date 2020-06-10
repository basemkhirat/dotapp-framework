export default {
    "/page": {
        get: {
            tags: ["Pages"],
            summary: "Find all pages",
            parameters: [
                {
                    name: "user",
                    in: "query",
                    description: "User ID",
                    type: "string",
                },
                {
                    name: "lang",
                    in: "query",
                    description: "Lang",
                    type: "string",
                    enum: ["en", "ar"],
                },
                {
                    name: "status",
                    in: "query",
                    description: "Status",
                    type: "integer",
                    enum: [0, 1],
                },
                {
                    name: "tags",
                    in: "query",
                    description: "Post tags",
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
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
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        post: {
            tags: ["Pages"],
            summary: "Create a new page",
            parameters: [
                {
                    name: "title",
                    in: "query",
                    description: "Page title",
                    type: "string",
                    required: true,
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Page slug",
                    type: "string",
                },
                {
                    name: "excerpt",
                    in: "query",
                    description: "Page excerpt",
                    type: "string",
                },
                {
                    name: "content",
                    in: "query",
                    description: "Page content",
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            type: {
                                type: "string",
                            },
                        },
                        example: {
                            type: "paragraph",
                            content: "Sample content",
                        },
                    },
                },
                {
                    name: "media",
                    in: "query",
                    description: "Media ID",
                    type: "string",
                },
                {
                    name: "lang",
                    in: "query",
                    description: "Lang",
                    type: "string",
                    enum: ["en", "ar"],
                },
                {
                    name: "status",
                    in: "query",
                    description: "Status",
                    type: "integer",
                    enum: [0, 1],
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
            tags: ["Pages"],
            summary: "Bulk pages update/delete",
            parameters: [
                {
                    name: "operation",
                    in: "query",
                    description: "operation",
                    required: true,
                    type: "string",
                    enum: ["delete", "update"],
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
                {
                    name: "data",
                    in: "query",
                    description: "Data for update",
                    type: "object",
                    default: {},
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

    "/page/{id}": {
        get: {
            tags: ["Pages"],
            summary: "Get page by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Page ID",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        put: {
            tags: ["Pages"],
            summary: "Update page by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Page ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "title",
                    in: "query",
                    description: "Page title",
                    type: "string",
                    required: true,
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Page Slug",
                    type: "string",
                },
                {
                    name: "excerpt",
                    in: "query",
                    description: "Page excerpt",
                    type: "string",
                },
                {
                    name: "content",
                    in: "query",
                    description: "Page content",
                    type: "array",
                },
                {
                    name: "media",
                    in: "query",
                    description: "Media ID",
                    type: "string",
                },
                {
                    name: "lang",
                    in: "query",
                    description: "Lang",
                    type: "string",
                    enum: ["en", "ar"],
                },
                {
                    name: "status",
                    in: "query",
                    description: "Status",
                    type: "integer",
                    enum: [0, 1],
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
            tags: ["Pages"],
            summary: "Delete page by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Page ID",
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

    "/page/slug/{slug}": {
        get: {
            tags: ["Pages"],
            summary: "Get page by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    description: "Page slug",
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
