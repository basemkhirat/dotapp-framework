export default {
    "/post": {
        get: {
            tags: ["Posts"],
            summary: "Find all posts",
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
                    name: "format",
                    in: "query",
                    description: "Post format",
                    type: "string",
                    enum: ["post", "image", "video", "gallery"],
                },
                {
                    name: "type",
                    in: "query",
                    description: "Post type",
                    type: "string",
                    enum: ["post", "article"],
                },
                {
                    name: "author",
                    in: "query",
                    description: "Post author",
                    type: "string",
                },
                {
                    name: "categories",
                    in: "query",
                    description: "Post categories",
                    type: "array",
                    items: {
                        type: "string",
                    },
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
            tags: ["Posts"],
            summary: "Create a new post",
            parameters: [
                {
                    name: "title",
                    in: "query",
                    description: "Post title",
                    type: "string",
                    required: true,
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Post slug",
                    type: "string",
                },
                {
                    name: "excerpt",
                    in: "query",
                    description: "Post excerpt",
                    type: "string",
                },
                {
                    name: "content",
                    in: "query",
                    description: "Post content",
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
                    name: "type",
                    in: "query",
                    description: "Post type",
                    type: "string",
                    enum: ["post", "article"],
                },
                {
                    name: "author",
                    in: "query",
                    description: "Post author",
                    type: "string",
                },

                {
                    name: "format",
                    in: "query",
                    description: "Post format",
                    type: "string",
                    enum: ["post", "image", "video", "gallery"],
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
                {
                    name: "published_at",
                    in: "query",
                    description: "Post published date",
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
            tags: ["Posts"],
            summary: "Bulk posts update/delete",
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
    "/post/formats": {
        get: {
            tags: ["Posts"],
            summary: "Get all post formats",
            responses: {
                $ref: "#/responses",
            },
        },
    },

    "/post/{id}": {
        get: {
            tags: ["Posts"],
            summary: "Get post by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Post ID",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
        put: {
            tags: ["Posts"],
            summary: "Update post by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Post ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "title",
                    in: "query",
                    description: "Post title",
                    type: "string",
                    required: true,
                },
                {
                    name: "slug",
                    in: "query",
                    description: "Post Slug",
                    type: "string",
                },
                {
                    name: "excerpt",
                    in: "query",
                    description: "Post excerpt",
                    type: "string",
                },
                {
                    name: "content",
                    in: "query",
                    description: "Post content",
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
                    name: "type",
                    in: "query",
                    description: "Post type",
                    type: "string",
                    enum: ["post", "article"],
                },
                {
                    name: "author",
                    in: "query",
                    description: "Post author",
                    type: "string",
                },

                {
                    name: "format",
                    in: "query",
                    description: "Post format",
                    type: "string",
                    enum: ["post", "image", "video", "gallery"],
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
                    description: "Post published date",
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
            tags: ["Posts"],
            summary: "Delete post by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Post ID",
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
    "/post/slug/{slug}": {
        get: {
            tags: ["Posts"],
            summary: "Get post by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    description: "Post slug",
                    required: true,
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },

    "/post/like/{id}": {
        put: {
            tags: ["Posts"],
            summary: "like/unlike post by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Post ID",
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
    "/post/follow/{id}": {
        put: {
            tags: ["Posts"],
            summary: "follow/unfollow post by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Post ID",
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
    "/post/comment/{id}": {
        put: {
            tags: ["Posts"],
            summary: "follow/unfollow comment by id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Post ID",
                    required: true,
                    type: "string",
                },
                {
                    name: "body",
                    in: "path",
                    description: "Comment body",
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
