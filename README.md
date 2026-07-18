# Desafio Técnico: Eteg

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
```

## 🚀 Como rodar o projeto

**Pré-requisitos:**
- Docker e Docker Compose instalados.
- Node.js (v20+ recomendado).

**Passo a passo:**
1. Clonar o repositório
 - `git clone https://github.com/henriquecbackes/desafio-eteg.git`

2. Configurar as variáveis de ambiente:
 - Entre na pasta customer-api/
 - Crie um arquivo .env baseado no .env.example (comando sugerido: `cp .env.example .env`)

3. Iniciar os serviços (Backend + Banco de Dados):
 - `docker-compose up --build`

4. Iniciar o Frontend:
 - Entre na pasta customer-register-app/
 - Execute `npm install` para instalar as dependências do projeto
 - Rode o projeto com `npm run dev`
