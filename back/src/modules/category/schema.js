const { schema_error } = require("@src/core/utils");
module.exports = {
    category_schema: {
        tags: ["Category"],
        summary: "Add record to category schema",
        description: "Returns a category record",
        body: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
            },
            required: ["name"],
        },
        response: {
            201: {
                description: "Returns Category record added successfully",
                type: "object",
                properties: {
                    id: {
                        type: "number",
                    },
                    name: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
};
