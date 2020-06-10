export default {
    "/role": {
        get: {
            tags: ["Roles"],
            summary: "Find all roles",
            parameters: [
                {
                    name: "status",
                    in: "query",
                    description: "Status",
                    type: "integer",
                    enum: [0, 1],
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
            security: [
                {
                    "bearer token": [],
                },
            ],
        },
        post: {
            tags: ["Roles"],
            summary: "Create new role",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    description: "Role Name",
                    type: "string",
                    required: true,
                },
                {
                    name: "status",
                    in: "query",
                    description: "Status",
                    type: "integer",
                    enum: [0, 1],
                },
                {
                    name: "permissions",
                    in: "query",
                    description: "Role Permissions",
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
            tags: ["Roles"],
            summary: "Bulk roles delete/update",
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
    "/role/{id}": {
        get: {
            tags: ["Roles"],
            summary: "Get role by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Role ID",
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
        put: {
            tags: ["Roles"],
            summary: "Update role by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Role ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "name",
                    in: "query",
                    description: "Role Name",
                    type: "string",
                },
                {
                    name: "status",
                    in: "query",
                    description: "Status",
                    type: "integer",
                    enum: [0, 1],
                },
                {
                    name: "permissions",
                    in: "query",
                    description: "Role Permissions",
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
            tags: ["Roles"],
            summary: "Delete role by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Role ID",
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
