module.exports.swagger = {
    swagger: {
        info: {
            title: "CAIET Forms API",
            description: "Data collection system.",
            version: "1.0.0",
        },
        host: "localhost:4000",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
    },
};

module.exports.swagger_ui = {
    routePrefix: "/swagger",
    uiConfig: {
        docExpansion: "list", // none, full, list
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next();
        },
        preHandler: function (request, reply, next) {
            next();
        },
    },
    staticCSP: false, //true only ssl
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
    },
    transformSpecificationClone: true,
};
