export default {
    "/category/slug/{slug}": {
        get: {
            tags: ["Categories"],
            summary: "Get category by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    description: "Category slug",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },

    "/category": {
        get: {
            tags: ["Categories"],
            summary: "Find all categories",
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
        },
        post: {
            tags: ["Categories"],
            summary: "Create a new category",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    description: "Category Name",
                    type: "string",
                    required: true,
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
        patch: {
            tags: ["Categories"],
            summary: "Bulk categories delete",
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
    }
};
