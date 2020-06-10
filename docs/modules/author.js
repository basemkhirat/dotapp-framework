export default {
    "/author/slug/{slug}": {
        get: {
            tags: ["Authors"],
            summary: "Get author by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    description: "Author slug",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },

    "/author": {
        get: {
            tags: ["Authors"],
            summary: "Find all authors",
            parameters: [
                {
                    name: "user",
                    in: "query",
                    description: "User ID",
                    type: "string",
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
            tags: ["Authors"],
            summary: "Create a new author",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    description: "Author Name",
                    type: "string",
                    required: true,
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Author Slug",
                    type: "string",
                },
                {
                    name: "description",
                    in: "query",
                    description: "Author Description",
                    type: "string",
                },
                {
                    name: "image",
                    in: "query",
                    description: "Media ID",
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
        patch: {
            tags: ["Authors"],
            summary: "Bulk authors delete",
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
    "/author/{id}": {
        get: {
            tags: ["Authors"],
            summary: "Get author by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Author ID",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        put: {
            tags: ["Authors"],
            summary: "Update author by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Author ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "name",
                    in: "query",
                    description: "Author Name",
                    type: "string",
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Author Slug",
                    type: "string",
                },
                {
                    name: "description",
                    in: "query",
                    description: "Author Description",
                    type: "string",
                },
                {
                    name: "image",
                    in: "query",
                    description: "Media ID",
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
        delete: {
            tags: ["Authors"],
            summary: "Delete author by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Author ID",
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
};
