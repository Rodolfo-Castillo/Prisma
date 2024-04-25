import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/products", async (req, res) => {
    const productos = await prisma.product.findMany();
    res.json(productos);
});

router.get("/product/:id", async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: +req.params.id,
        },
    });
    if (!product)
        return res.status(404).json({ message: "Product not found." });
    res.json(product);
});

router.post("/products", async (req, res) => {
    const newProduct = await prisma.product.create({
        data: req.body,
    });
    res.json(newProduct);
});

export default router;
