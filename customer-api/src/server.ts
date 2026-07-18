import { config } from "dotenv";
config();

import express from "express";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const CORES_ARCO_IRIS = [
  "vermelho",
  "laranja",
  "amarelo",
  "verde",
  "azul",
  "anil",
  "violeta",
] as const;

const cadastroSchema = z.object({
  nome: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos"),
  email: z.email("E-mail inválido"),
  cor: z.enum(CORES_ARCO_IRIS, {
    error: `A cor deve ser uma das seguintes: ${CORES_ARCO_IRIS.join(", ")}`,
  }),
  observacoes: z.string().optional(),
});

app.post("/api/cadastros", async (req, res) => {
  try {
    const data = cadastroSchema.parse(req.body);
    const novoCadastro = await prisma.cadastro.create({ data });
    res.status(201).json(novoCadastro);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

app.get("/api/cadastros", async (req, res) => {
  const cadastros = await prisma.cadastro.findMany();
  res.json(cadastros);
});

app.get("/api/cadastros/:id", async (req, res) => {
  const cadastro = await prisma.cadastro.findUnique({
    where: { id: req.params.id },
  });
  if (!cadastro)
    return res.status(404).json({ error: "Cadastro não encontrado" });
  res.json(cadastro);
});

app.put("/api/cadastros/:id", async (req, res) => {
  try {
    const data = cadastroSchema.partial().parse(req.body);
    const cadastroAtualizado = await prisma.cadastro.update({
      where: { id: req.params.id },
      data,
    });
    res.json(cadastroAtualizado);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

app.delete("/api/cadastros/:id", async (req, res) => {
  try {
    await prisma.cadastro.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Cadastro não encontrado" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
