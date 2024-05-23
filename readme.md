# API REST para Sistema de Aluguel de Vestidos

Esta API REST está sendo desenvolvida para gerenciar um sistema de aluguel de vestidos. O objetivo é fornecer uma plataforma eficiente e escalável para a administração de itens de vestuário, clientes, reservas e outras funcionalidades essenciais para um negócio de aluguel de vestidos.

## Tecnologias Utilizadas

- **Node.js:** Plataforma de desenvolvimento para criar aplicações de rede escaláveis e de alta performance.
- **Express:** Framework web para Node.js, utilizado para criar APIs de forma rápida e fácil.
- **MongoDB:** Banco de dados NoSQL utilizado para armazenar dados de forma flexível e escalável.
- **Mongoose:** Biblioteca para modelar dados em MongoDB, fornecendo uma interface robusta e intuitiva.
- **Dotenv:** Biblioteca para gerenciar variáveis de ambiente de forma segura.

## Funcionalidades

A API irá oferecer uma série de funcionalidades que suportam as operações de um sistema de aluguel de vestidos:

- **Gerenciamento de Vestidos:** CRUD (Create, Read, Update, Delete) de itens de vestuário, permitindo adicionar novos vestidos, atualizar detalhes, listar e remover.
- **Cadastro de Clientes:** Registro e gerenciamento de clientes, com dados pessoais e históricos de aluguel.
- **Reservas:** Sistema de reservas que permite aos clientes reservar vestidos para datas específicas.
- **Autenticação e Autorização:** Mecanismos de autenticação para garantir que apenas usuários autorizados possam acessar e modificar dados sensíveis.

## Instalação e Configuração

Siga os passos abaixo para configurar e iniciar o projeto.

1. **Inicializar o Projeto Node.js:**
    ```bash
    npm init -y
    ```
    Este comando cria um novo projeto Node.js com configurações padrão.

2. **Configurar Módulos ES6:**
    Adicione `"type": "module"` ao arquivo `package.json` para habilitar a importação e exportação de módulos ES6.
    ```json
    {
      "name": "sistema-aluguel-vestidos",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "type": "module",
      "scripts": {
        "dev": "nodemon server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC"
    }
    ```

3. **Iniciar o Servidor:**
    Crie um arquivo `server.js` e adicione a seguinte linha para importar a biblioteca HTTP nativa do Node.js:
    ```javascript
    import http from 'http';
    ```

    Para iniciar o servidor, use o comando:
    ```bash
    node server.js
    ```

4. **Instalar Nodemon:**
    Instale o Nodemon para reiniciar automaticamente o servidor após alterações no código:
    ```bash
    npm install nodemon@3.0.1
    ```

5. **Instalar Express:**
    Instale o Express, um framework web para Node.js:
    ```bash
    npm install express@4.18.1
    ```

6. **Instalar MongoDB e Mongoose:**
    Instale o MongoDB e o Mongoose para interação com o banco de dados MongoDB:
    ```bash
    npm install mongodb
    npm install mongoose
    ```

7. **Instalar Dotenv:**
    Instale o Dotenv para carregar variáveis de ambiente a partir de um arquivo `.env`:
    ```bash
    npm install dotenv
    ```

8. **Adicionar Script Nodemon em "scripts" do package.json:**
    Adicione `"dev": "nodemon server.js"` em `"scripts"` no `package.json` para iniciar o servidor com Nodemon:
    ```json
    "scripts": {
      "dev": "nodemon server.js"
    }
    ```

    Agora, você pode iniciar o servidor em modo de desenvolvimento com o comando:
    ```bash
    npm run dev
    ```

## Contribuição

Se você deseja contribuir para o desenvolvimento desta API, por favor, faça um fork do repositório, crie um branch para suas alterações e envie um pull request. Todas as contribuições são bem-vindas!

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
