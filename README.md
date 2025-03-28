# Projeto-TaskFlow---Gerenciador-de-Tarefas
aplicação web completa para gerenciamento de tarefas, onde os usuários podem adicionar, editar, excluir e marcar tarefas como concluídas. 

# Task Manager App

## Tecnologias

- **Frontend**: React, JavaScript, CSS (Tailwind, Styled Components, Bootstrap)
- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT, bcrypt
- **Infraestrutura**: Docker, Docker Compose
- **Deploy**: Vercel (Frontend), Render (Backend)

## Setup do Ambiente Local

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/task-manager-app.git](https://github.com/FFZimmer/Projeto-TaskFlow---Gerenciador-de-Tarefas.git)
   cd task-manager-app

2. Backend:

    Navegue para a pasta backend:

cd backend

Instale as dependências:

npm install

Crie o arquivo .env com as variáveis adequadas (veja exemplo acima).

Execute o backend localmente:

npm start

3. Frontend:

    Navegue para a pasta frontend:

cd frontend

Instale as dependências:

npm install

Crie o arquivo .env com a variável REACT_APP_API_URL configurada (veja exemplo acima).

Execute o frontend localmente:

        npm start

Dockerização

Para rodar a aplicação em containers Docker, use o Docker Compose:

    Navegue para a raiz do projeto e execute o comando:

    docker-compose up --build

    O frontend ficará disponível em http://localhost:3000 e o backend em http://localhost:5000.

Deploy

    Frontend: Deploy feito na Vercel. Acesse a aplicação em: [URL do frontend]

    Backend: Deploy feito no Render. Acesse a API em: [URL do backend]

Funcionalidades

    Login de usuário

    CRUD de Tarefas

        Criar, editar, excluir e visualizar tarefas.

    Marcar tarefas como concluídas

    Filtro de tarefas por status

    Autenticação JWT

    Recuperação de senha

    Cadastro de usuário

