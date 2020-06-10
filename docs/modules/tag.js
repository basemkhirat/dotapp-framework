export default {
    "/tag": {
        get: {
            tags: ["Tags"],
            summary: "Find all tags",
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
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        post: {
            tags: ["Tags"],
            summary: "Create a new tag",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    description: "Tag Name",
                    type: "string",
                    required: true,
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
            tags: ["Tags"],
            summary: "Bulk tags delete",
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

    "/tag/name/{name}": {
        get: {
            tags: ["Tags"],
            summary: "Get tag by name",
            parameters: [
                {
                    name: "name",
                    in: "path",
                    description: "Tag name",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },
    "/category/{id}": {
        get: {
            tags: ["Categories"],
            summary: "Get category by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Category ID",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        put: {
            tags: ["Categories"],
            summary: "Update category by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Category ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "name",
                    in: "query",
                    description: "Category Name",
                    type: "string",
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Category Slug",
                    type: "string",
                },
                {
                    name: "description",
                    in: "query",
                    description: "Category Description",
                    type: "string",
                },
                {
                    name: "image",
                    in: "query",
                    description: "Media ID",
                    type: "string",
                },
                {
                    name: "parent",
                    in: "query",
                    description: "Parent Category ID",
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
            tags: ["Categories"],
            summary: "Delete category by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Category ID",
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
    "/tag/{id}": {
        get: {
            tags: ["Tags"],
            summary: "Get tag by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Category ID",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        put: {
            tags: ["Tags"],
            summary: "Update tag by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Tag ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "name",
                    in: "query",
                    description: "Tag Name",
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
            tags: ["Tags"],
            summary: "Delete tag by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Tag ID",
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
