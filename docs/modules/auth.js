export default {
    "/auth/token": {
        "post": {
            "tags": [
                "Authentication"
            ],
            "summary": "Generate token",
            "parameters": [
                {
                    "name": "email",
                    "in": "query",
                    "description": "Email",
                    "required": true,
                    "type": "string",
                    "value": "rady@gmail.com"
                },
                {
                    "name": "password",
                    "in": "query",
                    "description": "Password",
                    "required": true,
                    "type": "string",
                    "value": "qwertyui"
                }
            ],
            "responses": {
                "$ref": "#/responses"
            }
        }
    },
    "/auth/forget": {
        "post": {
            "tags": [
                "Authentication"
            ],
            "summary": "Request a password reset",
            "parameters": [
                {
                    "name": "email",
                    "in": "query",
                    "description": "Email",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "$ref": "#/responses"
            }
        }
    },
    "/auth/reset": {
        "post": {
            "tags": [
                "Authentication"
            ],
            "summary": "Change password by password reset verification code",
            "parameters": [
                {
                    "name": "code",
                    "in": "query",
                    "description": "Password reset verification code",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "password",
                    "in": "query",
                    "description": "Password",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "$ref": "#/responses"
            }
        }
    },

    "/auth/verify": {
        "post": {
            "tags": [
                "Authentication"
            ],
            "summary": "Activate account by email verification code",
            "parameters": [
                {
                    "name": "code",
                    "in": "query",
                    "description": "Email verification code",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "$ref": "#/responses"
            }
        }
    },
    "/auth/user": {
        "get": {
            "tags": [
                "Authentication"
            ],
            "summary": "Get user by token",
            "responses": {
                "$ref": "#/responses"
            },
            "security": [
                {
                    "bearer token": []
                }
            ]
        }
    },
};
