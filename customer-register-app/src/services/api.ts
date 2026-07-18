// src/services/api.ts
import axios from "axios";

type TCreateRegister = {
  nome: string;
  cpf: string;
  email: string;
  cor: string;
  observacoes: string;
};

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createRegister = async (data: TCreateRegister) => {
  return await api.post("/api/cadastros", data);
};
