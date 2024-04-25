const Handler = require("./handler");
const Schema = require("./schema");
module.exports = (fastify) => [
    {
        method: "POST",
        url: "/category",
        schema: Schema.category_schema,
        handler: Handler.add,
    },
    {
        method: "GET",
        url: "/category",
        // schema: Schema.category_schema,
        handler: Handler.list,
    },
    {
        method: "PUT",
        url: "/category/:id",
        // schema: Schema.category_schema,
        handler: Handler.update,
    },
    {
        method: "DELETE",
        url: "/category/:id",
        // schema: Schema.category_schema,
        handler: Handler.delete,
    },
];
