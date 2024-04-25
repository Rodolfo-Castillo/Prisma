module.exports = (fastify) => [
    ...require("@src/modules/auth/router")(fastify),
    ...require("@src/modules/category/router")(fastify),
    ...require("@src/modules/product/router")(fastify),
];
