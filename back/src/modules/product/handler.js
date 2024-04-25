const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.add = async (req, reply) => {
    try {
        const data = req.body;
        const productFound = await prisma.product.findUnique({
            where: {
                name: data.name,
            },
        });
        if (productFound) {
            return reply.code(401).send({ message: "Product alredy added." });
        }
        const newProduct = await prisma.product.create({ data });
        return reply.code(201).send(newProduct);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.list = async (req, reply) => {
    try {
        const list = await prisma.product.findMany({
            include: {
                category: true,
            },
        });
        return reply.code(200).send(list);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.get = async (req, reply) => {
    try {
        const get = await prisma.product.findUnique({
            include: {
                category: true,
            },
            where: {
                id: +req.params.id,
            },
        });
        return reply.code(200).send(get);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.update = async (req, reply) => {
    try {
        const data = req.body;
        const updateProduct = await prisma.product.update({
            where: {
                id: +data.id,
            },
            data,
        });
        return reply.code(200).send({ updateProduct });
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.delete = async (req, reply) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: +req.params.id,
            },
        });
        return reply.code(200).send({ deletedProduct });
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};
