export default {
    "/auth/token": {
        post: {
            tags: ["Authentication"],
            summary: "Generate token",
            parameters: [
                {
                    name: "email",
                    in: "query",
                    description: "Email",
                    type: "string",
                    value: "rady@gmail.com",
                },
                {
                    name: "password",
                    in: "query",
                    description: "Password",
                    type: "string",
                    value: "qwertyui",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },
    "/auth/register": {
        post: {
            tags: ["Authentication"],
            summary: "Register a new user",
            parameters: [
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
                    name: "lang",
                    in: "query",
                    description: "Lang",
                    type: "string",
                    in: "ar,en",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },

    "/auth/profile": {
        post: {
            tags: ["Authentication"],
            summary: "Update user personal information",
            parameters: [
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
                    name: "lang",
                    in: "query",
                    description: "Lang",
                    type: "string",
                    in: "ar,en",
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

    "/auth/repassword": {
        post: {
            tags: ["Authentication"],
            summary: "Change user password",
            parameters: [
                {
                    name: "old_password",
                    in: "query",
                    description: "Old Password",
                    type: "string",
                },
                {
                    name: "new_password",
                    in: "query",
                    description: "New Password",
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

    "/auth/forgot": {
        post: {
            tags: ["Authentication"],
            summary: "Forgot my password",
            parameters: [
                {
                    name: "email",
                    in: "query",
                    description: "Email",
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },
    "/auth/reset": {
        post: {
            tags: ["Authentication"],
            summary: "Change password by password reset verification code",
            parameters: [
                {
                    name: "code",
                    in: "query",
                    description: "Password reset verification code",
                    type: "string",
                },
                {
                    name: "password",
                    in: "query",
                    description: "Password",
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },

    "/auth/verify": {
        post: {
            tags: ["Authentication"],
            summary: "Activate account by email verification code",
            parameters: [
                {
                    name: "code",
                    in: "query",
                    description: "Email verification code",
                    type: "string",
                },
            ],
            responses: {
                $ref: "#/responses",
            },
        },
    },
    "/auth/user": {
        get: {
            tags: ["Authentication"],
            summary: "Get authenticated user",
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
