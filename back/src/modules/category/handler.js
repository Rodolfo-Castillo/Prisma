const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.add = async (req, reply) => {
    try {
        const data = req.body;
        const categoryFound = await prisma.category.findUnique({
            where: {
                name: data.name,
            },
        });
        if (categoryFound) {
            return reply.code(401).send({ message: "Category alredy added." });
        }
        const newCategory = await prisma.category.create({ data });
        return reply.code(201).send(newCategory);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.list = async (req, reply) => {
    try {
        const list = await prisma.category.findMany();
        return reply.code(200).send(list);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.update = async (req, reply) => {
    try {
        const data = req.body;
        const updateCategory = await prisma.category.update({
            where: {
                id: +data.id,
            },
            data: {
                name: data.name,
            },
        });
        return reply.code(200).send({ updateCategory });
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.delete = async (req, reply) => {
    try {
        const deletedCategory = await prisma.category.delete({
            where: {
                id: +req.params.id,
            },
        });
        return reply.code(200).send({ deletedCategory });
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};
