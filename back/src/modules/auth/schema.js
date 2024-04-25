const { schema_error } = require("@src/core/utils");
module.exports = {
    auth_schema: {
        tags: ["Auth"],
        summary: "Signin user",
        description: "Returns a JWT from user login",
        body: {
            type: "object",
            properties: {
                username: {
                    type: "string",
                },
                password: {
                    type: "string",
                },
            },
            required: ["username", "password"],
        },
        response: {
            200: {
                description: "Returns Whatsapp model",
                type: "object",
                properties: {
                    token: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
    register_schema: {
        tags: ["Register"],
        summary: "Signin user",
        description: "Returns a new user and JWT from user",
        body: {
            type: "object",
            properties: {
                username: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
                password: {
                    type: "string",
                },
            },
            required: ["username", "email", "password"],
        },
        response: {
            200: {
                description: "Returns token",
                type: "object",
                properties: {
                    token: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
};
