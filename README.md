# Trabalho-backend

# API RESTful de Tarefas

API RESTful desenvolvida em Node.js + Express para gerenciar tarefas (`Task`), com autenticação JWT, validações, integração com MongoDB e testes automatizados com Jest + Supertest.

---

## Stack utilizada

- Node.js + Express  
- MongoDB (Mongoose)  
- JWT (JSON Web Token)  
- express-validator  
- Jest + Supertest  

---

## Arquitetura e boas práticas

- Versionamento de API: `v1` (`/api/v1/...`)
- Padrão REST:
  - Verbos HTTP adequados (GET, POST, PUT, DELETE)
  - Códigos de status coerentes (`200`, `201`, `400`, `401`, `404`, `500`)
- Separação em camadas:
  - `models` – Modelos Mongoose (`User`, `Task`)
  - `controllers` – Regras de negócio
  - `routes` – Definição das rotas
  - `middlewares` – Autenticação, validação, tratamento de erros
  - `validators` – Validações de entrada com express-validator
- Autenticação JWT protegendo as rotas de escrita:
  - Criar, atualizar e deletar tarefas exigem token válido

---

## Configuração do projeto

### Pré-requisitos

- Node.js (>= 18)  
- npm  
- Instância de MongoDB (local ou na nuvem, ex.: MongoDB Atlas)  
- Git  

### Passos para rodar localmente

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/JSchettini18/Trabalho-backend.git
   cd Trabalho-backend

# Instalar dependências

npm install

# Configurar variáveis de ambiente

Copie o arquivo .env.example para .env:

cp .env.example .env

# Edite o .env com os valores corretos:

PORT=3000
MONGO_URI=sua_string_real_do_mongodb
JWT_SECRET=uma_chave_bem_secreta

# Rodar em modo desenvolvimento (com nodemon)

npm run dev

# Rodar a documentaçao no Swagger pelo navegador

http://localhost:3000/api-docs


# Rodar em modo “produção” simples

npm start

# Endpoints da API
Base URL

Local: http://localhost:3000/api/v1

# Health-check
# GET /health

Verifica se a API está respondendo.

# Resposta:

200 OK

{
  "status": "ok",
  "message": "API de Tarefas funcionando"
}


# Autenticação
# POST /auth/register

Cria um novo usuário e retorna um token JWT.

Body (JSON):

{
  "name": "Joao",
  "email": "Joao@example.com",
  "password": "123456"
}


Respostas:

201 Created – Usuário criado com sucesso + token JWT

400 Bad Request – Erros de validação (campos obrigatórios, formatos)

409 Conflict – E-mail já cadastrado

# POST /auth/login

Realiza login e retorna um token JWT.

Body (JSON):

{
  "email": "joao@example.com",
  "password": "123456"
}


Respostas:

200 OK – Login bem-sucedido + token JWT

400 Bad Request – Erros de validação

401 Unauthorized – Credenciais inválidas

# Tarefas (Task)

Todas as rotas de tarefas exigem token JWT no header:

Authorization: Bearer SEU_TOKEN_AQUI


# GET /tasks

Lista todas as tarefas do usuário autenticado.

Headers:

Authorization: Bearer SEU_TOKEN_AQUI

Respostas:

200 OK – Retorna um array de tarefas do usuário

Exemplo de resposta:

{
  "tasks": [
    {
      "_id": "656f0c...",
      "title": "Estudar backend",
      "description": "Finalizar trabalho da faculdade",
      "status": "pendente",
      "dueDate": "2025-11-30T00:00:00.000Z",
      "createdBy": "656f0b...",
      "createdAt": "2025-11-13T10:00:00.000Z",
      "updatedAt": "2025-11-13T10:00:00.000Z",
      "__v": 0
    }
  ]
}


# GET /tasks/:id

Busca uma tarefa específica do usuário autenticado.

Headers:

Authorization: Bearer SEU_TOKEN_AQUI

Respostas:

200 OK – Retorna a tarefa

404 Not Found – Tarefa não encontrada ou não pertence ao usuário autenticado


# POST /tasks

Cria uma nova tarefa.

Headers:

Authorization: Bearer SEU_TOKEN_AQUI

Body (JSON):

{
  "title": "Estudar API",
  "description": "Fazer trabalho da faculdade",
  "status": "pendente",
  "dueDate": "2025-11-30"
}


Campos:

title (string, obrigatório, min. 3 caracteres)

description (string, opcional, máx. 500 caracteres)

status (opcional, valores permitidos: "pendente", "em_andamento", "concluida")

dueDate (opcional, data em formato ISO: YYYY-MM-DD)

Respostas:

201 Created – Tarefa criada com sucesso

400 Bad Request – Erros de validação

401 Unauthorized – Token ausente ou inválido

Exemplo de resposta:

{
  "message": "Tarefa criada com sucesso",
  "task": {
    "_id": "656f0c...",
    "title": "Estudar API",
    "description": "Fazer trabalho da faculdade",
    "status": "pendente",
    "dueDate": "2025-11-30T00:00:00.000Z",
    "createdBy": "656f0b...",
    "createdAt": "2025-11-13T10:00:00.000Z",
    "updatedAt": "2025-11-13T10:00:00.000Z",
    "__v": 0
  }
}


# PUT /tasks/:id

Atualiza uma tarefa existente do usuário autenticado.

Headers:

Authorization: Bearer SEU_TOKEN_AQUI

Body (JSON) – todos os campos opcionais:

{
  "title": "Estudar API com calma",
  "description": "Refinar o projeto",
  "status": "em_andamento",
  "dueDate": "2025-12-01"
}


Respostas:

200 OK – Tarefa atualizada com sucesso

400 Bad Request – Erros de validação

401 Unauthorized – Token ausente ou inválido

404 Not Found – Tarefa não encontrada ou não pertence ao usuário


# DELETE /tasks/:id

Deleta uma tarefa do usuário autenticado.

Headers:

Authorization: Bearer SEU_TOKEN_AQUI

Respostas:

200 OK – Tarefa deletada com sucesso

401 Unauthorized – Token ausente ou inválido

404 Not Found – Tarefa não encontrada ou não pertence ao usuário


# Testes automatizados

Os testes cobrem:

# Rotas de autenticação:

Validação de campos obrigatórios em /auth/register e /auth/login

# Rotas de tarefas:

Garantia de que /tasks exige token JWT

# Controller de tarefas:

Criação de tarefa (createTask) com o Task model mockado

# Rodar os testes
npm test


# Organização dos commits e issues

O desenvolvimento foi organizado em blocos, com commits semânticos, por exemplo:

chore: setup inicial do projeto Node e Express

chore: configurar conexão MongoDB e variáveis de ambiente

feat: criar modelos User e Task e middleware de erro

feat: implementar autenticação JWT com rotas de registro e login

feat: implementar CRUD protegido de tarefas com validações

test: adicionar testes para rotas de auth/tarefas e controller

docs: adicionar README com documentação da API

Sugestão de Issues no GitHub:

Issue #1 – Setup inicial

Issue #2 – Integração com MongoDB

Issue #3 – Modelagem de dados (User, Task)

Issue #4 – Autenticação JWT

Issue #5 – CRUD de tarefas

Issue #6 – Testes automatizados

Issue #7 – Documentação (README)


# Integrantes do grupo e divisão de tarefas

João Schettini – Desenvolvimento completo:

Setup do projeto

Modelagem (User, Task)

Implementação das rotas e controllers

Autenticação JWT

Validações

Testes automatizados

Documentação (README)

Grupo composto por 1 integrante (dentro do limite máximo de 4 integrantes).