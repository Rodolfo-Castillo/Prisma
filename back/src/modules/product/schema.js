const { schema_error } = require("@src/core/utils");
module.exports = {
    product_schema: {
        tags: ["Product"],
        summary: "Add record to product schema",
        description: "Returns a product record",
        body: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
                price: {
                    type: "number",
                },
                stock: {
                    type: "number",
                },
                categoryId: {
                    type: "number",
                },
                image: {
                    type: "string",
                },
            },
            required: ["name", "price", "stock", "categoryId", "image"],
        },
        response: {
            201: {
                description: "Returns Product record added successfully",
                type: "object",
                properties: {
                    id: {
                        type: "number",
                    },
                    name: {
                        type: "string",
                    },
                    price: {
                        type: "number",
                    },
                    stock: {
                        type: "number",
                    },
                    categoryId: {
                        type: "number",
                    },
                    image: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
};
