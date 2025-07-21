import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { logTempoExecucao } from "./decorators"; 
dotenv.config(); 


function retornarPrimeiro<T>(arr: T[]): T {
    return arr[0];
}

const app = express();
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const port = 3000;

app.use(express.json());

class TarefaService {
    @logTempoExecucao
    async deletar(tarefaId: string) {
        return prisma.tarefa.update({
            where: { id: tarefaId }, 
            data: { deletadoEm: new Date() }
        });
    }
}
const tarefaService = new TarefaService();

app.get("/status", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

function validarTarefa(req: Request, res: Response, next: NextFunction) {
    const { titulo } = req.body;
    if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({ error: "Título é obrigatório e não pode ser vazio." });
    }
    next();
}

app.post("/tarefas", validarTarefa, async (req, res, next) => {
    try {
        const { titulo } = req.body;
        const novaTarefa = await prisma.tarefa.create({
            data: { titulo }
        });
        res.status(201).json(novaTarefa);
    } catch (error) {
        next(error); 
    }
});

app.get("/tarefas", async (req, res, next) => {
    try {
        const { concluida } = req.query;
        const filtro: any = { deletadoEm: null };
        if (concluida !== undefined) {
            filtro.concluida = concluida === "true";
        }
        const tarefas = await prisma.tarefa.findMany({ where: filtro });
        res.json(tarefas);
    } catch (error) {
        next(error);
    }
});

app.delete("/tarefas/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await tarefaService.deletar(id);
        res.status(204).send(); 
    } catch (error) {
        next(error);
    }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Ocorreu um erro:", err.stack); 
    res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    
    console.log("Teste da função genérica (números):", retornarPrimeiro([1, 2, 3]));
    console.log("Teste da função genérica (strings):", retornarPrimeiro(["a", "b", "c"]));
});