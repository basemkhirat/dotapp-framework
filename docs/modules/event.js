export default {
    "/event": {
        get: {
            tags: ["Events"],
            summary: "Find all events",
            parameters: [
                {
                    name: "user",
                    in: "query",
                    description: "User ID",
                    type: "string",
                },
                {
                    name: "place",
                    in: "query",
                    description: "Place ID",
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
                    name: "address",
                    in: "query",
                    description: "Address",
                    type: "string",
                },
                {
                    name: "type",
                    in: "query",
                    description: "Event type",
                    type: "string",
                    enum: ["free", "paid"],
                },
                {
                    name: "categories",
                    in: "query",
                    description: "Event categories",
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
                {
                    name: "tags",
                    in: "query",
                    description: "Event tags",
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
                    name: "from_date",
                    in: "query",
                    description: "From date",
                    type: "string",
                },
                {
                    name: "to_date",
                    in: "query",
                    description: "To date",
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
            tags: ["Events"],
            summary: "Create a new event",
            parameters: [
                {
                    name: "title",
                    in: "query",
                    description: "Event title",
                    type: "string",
                    required: true,
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Event slug",
                    type: "string",
                },
                {
                    name: "place",
                    in: "query",
                    description: "Event place ID",
                    type: "string",
                },
                {
                    name: "excerpt",
                    in: "query",
                    description: "Event excerpt",
                    type: "string",
                },
                {
                    name: "content",
                    in: "query",
                    description: "Event content",
                    type: "string",
                },
                {
                    name: "type",
                    in: "query",
                    description: "Event type",
                    type: "string",
                    enum: ["free", "paid"],
                },
                {
                    name: "price",
                    in: "query",
                    description: "Event price",
                    type: "string",
                },
                {
                    name: "currency",
                    in: "query",
                    description: "Event price currency",
                    type: "string",
                    enum: ["£", "$", "€"],
                },
                {
                    name: "address",
                    in: "query",
                    description: "Event address",
                    type: "string",
                },
                {
                    name: "map",
                    in: "query",
                    description: "Event map embed",
                    type: "string",
                },
                {
                    name: "media",
                    in: "query",
                    description: "Media ID",
                    type: "string",
                },

                {
                    name: "media_payload",
                    in: "query",
                    description: "Media payload",
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
                    name: "published_at",
                    in: "query",
                    description: "Event published date",
                    type: "string",
                    format: "date-time",
                },
                {
                    name: "scheduled_at",
                    in: "query",
                    description: "Event scheduled date",
                    type: "string",
                    format: "date-time",
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
            tags: ["Events"],
            summary: "Bulk events update/delete",
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
    "/event/slug/{slug}": {
        get: {
            tags: ["Events"],
            summary: "Get event by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    description: "Event slug",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },
    "/event/{id}": {
        get: {
            tags: ["Events"],
            summary: "Get event by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Event ID",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        put: {
            tags: ["Events"],
            summary: "Update event by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Event ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "title",
                    in: "query",
                    description: "Event title",
                    type: "string",
                    required: true,
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Event slug",
                    type: "string",
                },
                {
                    name: "excerpt",
                    in: "query",
                    description: "Event excerpt",
                    type: "string",
                },
                {
                    name: "content",
                    in: "query",
                    description: "Event content",
                    type: "string",
                },
                {
                    name: "place",
                    in: "query",
                    description: "Event place ID",
                    type: "string",
                },
                {
                    name: "type",
                    in: "query",
                    description: "Event type",
                    type: "string",
                    enum: ["free", "paid"],
                },
                {
                    name: "price",
                    in: "query",
                    description: "Event price",
                    type: "string",
                },
                {
                    name: "address",
                    in: "query",
                    description: "Event address",
                    type: "string",
                },
                {
                    name: "map",
                    in: "query",
                    description: "Event map embed",
                    type: "string",
                },
                {
                    name: "media",
                    in: "query",
                    description: "Media ID",
                    type: "string",
                },

                {
                    name: "media_payload",
                    in: "query",
                    description: "Media payload",
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
                    name: "published_at",
                    in: "query",
                    description: "Event published date",
                    type: "string",
                    format: "date-time",
                },
                {
                    name: "scheduled_at",
                    in: "query",
                    description: "Event scheduled date",
                    type: "string",
                    format: "date-time",
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
            tags: ["Events"],
            summary: "Delete event by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Event ID",
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
    "/event/likes/me": {
        get: {
            tags: ["Events"],
            summary: "Find all my likes",
            parameters: [
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
    },
    "/event/registrations/me": {
        get: {
            tags: ["Events"],
            summary: "Find all my registrations",
            parameters: [
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
    },
    "/event/like/{id}": {
        put: {
            tags: ["Events"],
            summary: "Like/unlike event by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Event ID",
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

    "/event/register/{id}": {
        put: {
            tags: ["Events"],
            summary: "Register an event",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Event ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "email",
                    in: "query",
                    description: "Email",
                    required: true,
                    type: "string",
                },
                {
                    name: "first_name",
                    in: "query",
                    description: "First Name",
                    required: true,
                    type: "string",
                },
                {
                    name: "last_name",
                    in: "query",
                    description: "Last Name",
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

    "/event/follow/{id}": {
        put: {
            tags: ["Events"],
            summary: "Follow/unfollow event by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Event ID",
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
