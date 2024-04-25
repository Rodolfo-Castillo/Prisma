import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/categories", async (req, res) => {
    const categorias = await prisma.category.findMany();
    res.json(categorias);
});

router.post("/categories", async (req, res) => {
    const newCategory = await prisma.category.create({
        data: req.body,
    });
    res.json(newCategory);
});

router.delete("/categories/:id", async (req, res) => {
    const categoryDeleted = await prisma.category.delete({
        where: {
            id: +req.params.id,
        },
    });
    res.json(categoryDeleted);
});

export default router;
