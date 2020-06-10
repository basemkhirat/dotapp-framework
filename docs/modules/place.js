export default {
    "/place": {
        get: {
            tags: ["Places"],
            summary: "Find all places",
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
            tags: ["Places"],
            summary: "Create a new place",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    description: "Place Name",
                    type: "string",
                    required: true,
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Place Slug",
                    type: "string",
                },

                {
                    name: "code",
                    in: "query",
                    description: "Place code if place is a country",
                    type: "string",
                },

                {
                    name: "parent",
                    in: "query",
                    description: "Parent place ID",
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
            tags: ["Places"],
            summary: "Bulk places delete",
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

    "/place/search": {
        get: {
            tags: ["Places"],
            summary: "Seach for a place",
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
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },

    "/place/{id}": {
        get: {
            tags: ["Places"],
            summary: "Get place by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Place ID",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        put: {
            tags: ["Places"],
            summary: "Update place by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Place ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "name",
                    in: "query",
                    description: "Place Name",
                    type: "string",
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Place Slug",
                    type: "string",
                },

                {
                    name: "code",
                    in: "query",
                    description: "Place code if place is a country",
                    type: "string",
                },

                {
                    name: "parent",
                    in: "query",
                    description: "Parent place ID",
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
            tags: ["Places"],
            summary: "Delete place by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Place ID",
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

    "/place/slug/{slug}": {
        get: {
            tags: ["Places"],
            summary: "Get place by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    description: "Place slug",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    }
};
