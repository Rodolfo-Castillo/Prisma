const Handler = require("./handler");
const Schema = require("./schema");
module.exports = (fastify) => [
    {
        method: "POST",
        url: "/signin",
        schema: Schema.auth_schema,
        handler: Handler.signin,
    },
    {
        method: "POST",
        url: "/register",
        schema: Schema.register_schema,
        handler: Handler.register,
    },
];
