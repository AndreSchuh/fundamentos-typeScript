// npm i @prisma/client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 4.1 Query com filtro
app.get("/tarefas", async (req, res) => {
    const { concluida } = req.query;
    const filtro: any = { deletadoEm: null };
    if (concluida !== undefined) filtro.concluida = concluida === "true";
    const tarefas = await prisma.tarefa.findMany({ where: filtro });
    res.json(tarefas);
});

// 4.2 Soft Delete
app.delete("/tarefas/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.tarefa.update({
        where: { id: Number(id) },
        data: { deletadoEm: new Date() }
    });
    res.json({ ok: true });
});