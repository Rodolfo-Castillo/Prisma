const Handler = require("./handler");
const Schema = require("./schema");
module.exports = (fastify) => [
    {
        method: "POST",
        url: "/product",
        schema: Schema.product_schema,
        handler: Handler.add,
    },
    {
        method: "GET",
        url: "/products",
        // schema: Schema.category_schema,
        handler: Handler.list,
    },
    {
        method: "GET",
        url: "/product/:id",
        // schema: Schema.category_schema,
        handler: Handler.get,
    },
    {
        method: "PUT",
        url: "/product/:id",
        schema: Schema.category_schema,
        handler: Handler.update,
    },
    {
        method: "DELETE",
        url: "/product/:id",
        // schema: Schema.category_schema,
        handler: Handler.delete,
    },
];
