# Cadastro de usuários

Desenvolvi este projeto para praticar a integração entre front-end, backend e banco de dados. A aplicação permite cadastrar, listar, editar e excluir usuários, mantendo os dados salvos mesmo depois de atualizar a página.

**[Acessar o projeto online](https://cadastro-de-usuarios-1fpc.onrender.com)**

IMPORTANTE: O backend utiliza hospedagem gratuita, então o primeiro acesso após um período sem uso pode demorar um pouco.

## Tecnologias

- **Front-end:** React, Vite, CSS e Axios.
- **Backend:** Node.js, Express, Mongoose e CORS.
- **Banco de dados:** MongoDB Atlas.
- **Hospedagem:** Render.

## Funcionalidades

- Cadastro com nome, e-mail e idade.
- Listagem dos usuários salvos no banco.
- Edição dos dados em uma caixa de diálogo.
- Exclusão com confirmação antes de remover o usuário.
- Avisos para campos vazios e e-mail já cadastrado durante o cadastro.


## Organização

backend/   → API e conexão com o banco de dados
frontend/  → Interface e comunicação com a API

## O que aprendi

Neste projeto, pratiquei componentes e estados no React, requisições com Axios, criação de rotas no Express e operações no MongoDB. Também aprendi a tratar alguns erros, proteger a conexão do banco com variáveis de ambiente e publicar o front-end e o backend.
