# Fundamentos de TypeScript + API com Prisma

Estudos de TypeScript em níveis (tipos, funções, interfaces, generics e decorators) aplicados numa API REST com **Express**, **Prisma** e **MongoDB**.

## O que tem aqui
- `nivel1.ts` / `nivel2.ts`: exercícios de tipos básicos, funções tipadas, interfaces e generics
- `decorators.ts`: decorator `@logTempoExecucao`, que mede o tempo de execução de métodos
- `app.ts`: API com:
  - **Tarefas**: criar, listar e excluir (*soft delete* com `deletadoEm`)
  - **Livros**: cadastrar, listar e emprestar (`PATCH /livros/:id/emprestar`)
  - Middlewares de validação e tratamento de erros
- `schema.prisma`: modelos `Tarefa` e `Livro`

## Tecnologias
TypeScript · Node.js · Express 5 · Prisma ORM · MongoDB

## Como rodar
```bash
cd src
npm install
# crie um .env com DATABASE_URL="mongodb+srv://..."
npx prisma generate
npm run dev            # http://localhost:3000
```
