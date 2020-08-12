export default {
    "/user/{id}": {
        get: {
            tags: ["Users"],
            summary: "Get user by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "User ID",
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
            tags: ["Users"],
            summary: "Update user by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "User ID",
                    type: "string",
                    required: true,
                },
                {
                    name: "email",
                    in: "query",
                    description: "Email",
                    type: "string",
                },
                {
                    name: "password",
                    in: "query",
                    description: "Password",
                    type: "string",
                },
                {
                    name: "first_name",
                    in: "query",
                    description: "First Name",
                    type: "string",
                },
                {
                    name: "last_name",
                    in: "query",
                    description: "Last Name",
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
                    name: "lang",
                    in: "query",
                    description: "Lang",
                    type: "string",
                    enum: ["en", "ar"],
                },
                {
                    name: "photo",
                    in: "query",
                    description: "Media ID",
                    type: "string",
                },
                {
                    name: "role",
                    in: "query",
                    description: "Role ID",
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
            tags: ["Users"],
            summary: "Delete user by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "User ID",
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
    "/user": {
        get: {
            tags: ["Users"],
            summary: "Find all users",
            parameters: [
                {
                    name: "status",
                    in: "query",
                    description: "User Status",
                    type: "integer",
                    enum: [1, 0],
                },
                {
                    name: "lang",
                    in: "query",
                    description: "User Lang",
                    type: "string",
                    enum: ["en", "ar"],
                },
                {
                    name: "q",
                    in: "query",
                    description: "Search Keyword",
                    type: "string",
                },
                {
                    name: "role",
                    in: "query",
                    description: "Role ID",
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
                    description: "Records count",
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
            tags: ["Users"],
            summary: "Create a new user",
            parameters: [
                {
                    name: "email",
                    in: "query",
                    description: "Email",
                    type: "string",
                    required: true,
                },
                {
                    name: "password",
                    in: "query",
                    description: "Password",
                    type: "string",
                    required: true,
                },
                {
                    name: "first_name",
                    in: "query",
                    description: "First Name",
                    type: "string",
                    required: true,
                },
                {
                    name: "last_name",
                    in: "query",
                    description: "Last Name",
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
                    name: "lang",
                    in: "query",
                    description: "Lang",
                    type: "string",
                    enum: ["en", "ar"],
                },
                {
                    name: "photo",
                    in: "query",
                    description: "Media ID",
                    type: "string",
                },
                {
                    name: "role",
                    in: "query",
                    description: "Role ID",
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
