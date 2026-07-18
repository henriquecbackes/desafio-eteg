# 🚀 Desafio Técnico: Eteg

Este projeto é uma aplicação de gestão de cadastros, desenvolvida como parte de um desafio técnico. O foco foi criar uma solução escalável, utilizando uma arquitetura de monorepo e containerização.

## 🛠 Tecnologias Utilizadas

**Frontend:**
- React
- Vite

**Backend:**
- Node.js (TypeScript)
- Express
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- Zod (Validação de schemas)

## 🏗 Arquitetura
O projeto está organizado em um monorepo para facilitar o gerenciamento do ciclo de vida da aplicação:

```text
/
├── backend/    # API REST (Node.js + Prisma)
└── frontend/   # Interface do usuário (React)
