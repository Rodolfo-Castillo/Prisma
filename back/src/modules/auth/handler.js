const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { encrypt, decrypt } = require("../../core/utils");

exports.register = async (req, reply) => {
    try {
        const data = req.body;
        const userFound = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (userFound) {
            return reply.code(400).send({ message: "User alredy exists." });
        }
        data.password = encrypt(data.password);
        const newUser = await prisma.user.create({ data });
        //ENVIA TODOS LOS DATOS EXCEPTO PASSWORD
        const { password: _, ...user } = newUser;
        const token = await addBitacora(user.idUser);
        const params = {
            token: token.token,
            username: user.username,
        };
        const jwtToken = req.server.jwt.sign(params, {
            expiresIn: "1d",
        });
        return reply.code(201).send({ token: jwtToken });
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.signin = async (req, reply) => {
    try {
        const data = req.body;
        const userFound = await prisma.user.findUnique({
            where: {
                username: data.username,
            },
        });
        if (userFound && decrypt(userFound.password) === data.password) {
            const token = await addBitacora(userFound.idUser);
            const params = {
                token: token.token,
                username: userFound.username,
            };
            const jwtToken = req.server.jwt.sign(params, {
                expiresIn: "1d",
            });
            return reply.code(201).send({ token: jwtToken });
        } else {
            return reply.code(401).send({ message: "Datos Incorrectos." });
        }
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

const addBitacora = async (idUser) => {
    const data = { idUser };
    const token = await prisma.bitacoraLogin.create({ data });
    return token;
};
