export default {
    "/media": {
        get: {
            tags: ["Media"],
            summary: "Find all media",
            parameters: [
                {
                    name: "type",
                    in: "query",
                    description: "Type",
                    type: "array",
                    items: {
                        type: "string",
                        enum: ["image", "video", "audio", "document"],
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
                    description: "Sorting field",
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
            tags: ["Media"],
            summary: "Add a new media",
            parameters: [
                {
                    name: "title",
                    in: "query",
                    description: "Title",
                    required: false,
                    type: "string",
                },
                {
                    name: "description",
                    in: "query",
                    description: "Description",
                    required: false,
                    type: "string",
                },
                {
                    name: "payload",
                    in: "query",
                    description:
                        "Media payload\n\n Available protocol: http:, https: and data:",
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
        patch: {
            tags: ["Media"],
            summary: "Bulk media delete/update",
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
    "/media/thumbnails": {
        get: {
            tags: ["Media"],
            summary: "Find all media thumbnails",
            responses: {
                $ref: "#/responses",
            },
        },
    },
    "/media/types": {
        get: {
            tags: ["Media"],
            summary: "Find all media types",
            responses: {
                $ref: "#/responses",
            },
        },
    },
    "/media/extensions": {
        get: {
            tags: ["Media"],
            summary: "Find all media extensions",
            responses: {
                $ref: "#/responses",
            },
        },
    },
    "/media/{id}": {
        get: {
            tags: ["Media"],
            summary: "Get media by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Media ID",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        put: {
            tags: ["Media"],
            summary: "Update media by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Media ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "title",
                    in: "query",
                    description: "Title",
                    required: false,
                    type: "string",
                },
                {
                    name: "description",
                    in: "query",
                    description: "Description",
                    required: false,
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
            tags: ["Media"],
            summary: "delete media by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Media ID",
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
    "/media/thumbnail/{id}": {
        put: {
            tags: ["Media"],
            summary: "Update media thumbnail by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Media ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "size",
                    in: "query",
                    description: "Size",
                    required: true,
                    type: "string",
                },
                {
                    name: "data",
                    in: "query",
                    description: "Base64 data image",
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
