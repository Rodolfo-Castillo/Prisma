const crypto = require("crypto");

module.exports.get_status_description = (status) => {
    let error;
    switch (parseInt(status)) {
        case 400:
            error = "Bad request";
            break;
        case 401:
            error = "Unauthorized";
            break;
        case 404:
            error = "Not Found";
            break;
        case 500:
            error = "Internal Server Error";
            break;
        case 501:
            error = "Unauthorized";
            break;
        default:
            error = "System Error";
            break;
    }
    return error;
};

exports.response = async (result, reply, expect_code = 200) => {
    return result.status != expect_code
        ? reply.code(result.status).send(result.message)
        : reply.code(result.status).send(result.data);
};

module.exports.schema_error = (status) => {
    return {
        description: this.get_status_description(status),
        type: "object",
        properties: {
            statusCode: {
                type: "string",
            },
            error: {
                type: "string",
            },
            message: {
                type: "string",
            },
        },
    };
};

module.exports.security = [
    {
        Bearer: [],
    },
];

// module.exports.acumulado_object_response = {
//     idpartefiscaliaacumulado: { type: "number" },
//     fecha: { type: "string" },
//     idtipoevento: { type: "number" },
//     tipoevento: { type: "string" },
//     cantidad: { type: "number" },
//     comentario: { type: "string" },
// };

// module.exports.ge_object_response = {
//     idpartege: { type: "number" },
//     fecha: { type: "string" },
//     hora: { type: "string" },
//     coordenadas: { type: "string" },
//     idmunicipio: { type: "number" },
//     municipio: { type: "string" },
//     idtipoevento: { type: "number" },
//     tipoevento: { type: "string" },
//     cantidad: { type: "number" },
//     nombrepersona: { type: "string" },
//     idsexo: { type: "number" },
//     sexotabla: { type: "string" },
//     sexo: { type: "string" },
//     comentario: { type: "string" },
// };

module.exports.encrypt = (text) => {
    var cypherKey = "mySecretKey";
    var cipher = crypto.createCipher("aes-256-cbc", cypherKey);
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted; //94grt976c099df25794bf9ccb85bea72
};

module.exports.decrypt = (text) => {
    var cypherKey = "mySecretKey";
    var decipher = crypto.createDecipher("aes-256-cbc", cypherKey);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec; //myPlainText
};
