module.exports = async (fastify) => {
    fastify.register(require("@fastify/jwt"), {
        secret: "fGHR!RU97dHrrw8AZeum!6uWpM1QAWqo7y/hClTCsijJY3avAF1aNpFXmxmP7ZI9U?Ali64J299e7EEA-0c=xny6cogdlN80YdbiqF9M!Ba45M-ccbD=9ZHbSALCm/n2",
        sign: {
            expiresIn: "1d",
            algorithm: "HS512",
        },
    });

    fastify.decorate("authenticate", async (request, reply) => {
        try {
            const { token } = await request.jwtVerify();
            request.body = { ...request.body, token };
        } catch (err) {
            reply.send(err);
        }
    });
};
