## Como Usar a API REST para Sistema de Aluguel de Vestidos

Este projeto foi desenvolvido durante os cursos "Node.js: criando uma API Rest com Express e MongoDB" e "Node.js: lidando com buscas, filtros, paginação e erros em uma API".
Este guia detalha como utilizar a API REST para gerenciar um sistema de aluguel de vestidos de forma eficiente e escalável. A API oferece funcionalidades para gerenciar itens de vestuário, clientes, reservas e gerar relatórios, automatizando e otimizando as operações do seu negócio.

## Descrição

A proposta inicial das vídeo aulas era desenvolver uma API REST para uma biblioteca. No entanto, decidi me desafiar criando um sistema mais complexo, incluindo algumas verificações adicionais que não foram abordadas nos cursos.

### Funcionalidades Implementadas

- **Validações**: Adicionei validadores de CPF e CNPJ para garantir a integridade dos dados.
- **Segurança**: Implementei verificações contra ataques XSS e SQL Injection.
- **HATEOAS**: Busquei atingir o Nível 3 — HATEOAS do Modelo de Maturidade de Richardson para APIs REST, um conceito que aprendi durante minha faculdade e tentei aplicar neste projeto.
- **Testes Automatizados**: Utilizei o Postman para criar testes automatizados, aumentando assim a velocidade e a confiabilidade do desenvolvimento.

## Melhorias Futuras

O código ainda possui diversos pontos de melhoria que pretendo implementar no futuro. Estes pontos estão comentados no código para referência futura.

### Tecnologias Empregadas

O desenvolvimento do sistema foi realizado utilizando as seguintes tecnologias:

* **Node.js:** Plataforma de alta performance para aplicações escaláveis.
* **Express:** Framework web para criação rápida e fácil de APIs.
* **MongoDB:** Banco de dados NoSQL flexível e escalável.
* **Mongoose:** Modelagem de dados robusta e intuitiva para MongoDB.
* **Outras:** Dotenv, Bcrypt, Eslint, Mongoose Autopopulate, Sanitize HTML, FS-Extra.

### Pré-requisitos: ###

* Conta GitHub
* Node.js instalado
* MongoDB Atlas
* Ferramenta de teste de API (opcional, mas recomendada: Postman)

### Etapas: ###

**1. Clonar o Repositório:**

```bash
git clone https://github.com/LeonardoReisSimiao/api-vestidos
cd api-vestidos
```

**2. Instalar Dependências:**

```bash
npm install
```

**3. Configurar Variáveis de Ambiente:**

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```
DB_CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster>.h1vabwu.mongodb.net/<database>?retryWrites=true&w=majority&appName=<cluster>
```

**4. Iniciar o Servidor:**

```bash
npm run dev
```

**5. Testar a API:**

A API pode ser testada usando ferramentas como o Postman. Importe o arquivo Postman Collection disponível no repositório para visualizar as requisições e respostas da API.

**6. Documentação da API**

https://documenter.getpostman.com/view/35063870/2sA3kPqQUV

**Documentação da API REST**

Este guia detalha as rotas e funcionalidades da API REST para gerenciar um sistema de aluguel de vestidos. A API oferece recursos para gerenciar aluguéis, empresas, usuários e vestidos de forma eficiente e escalável.

**Rotas:**

### Aluguel

| Rota | Método HTTP | Descrição | Funcionalidade |
|---|---|---|---|
| `/aluguel` | GET | Obter lista de aluguéis | Lista todos os aluguéis cadastrados, podendo ser paginada. |
| `/aluguel/ativos` | GET | Obter lista de aluguéis ativos | Lista apenas os aluguéis que estão ativos, ou seja, em andamento. |
| `/aluguel/:id` | GET | Obter aluguel por ID | Consulta um aluguel específico através do seu ID. |
| `/aluguel` | POST | Criar novo aluguel | Cadastra um novo aluguel com as informações do cliente, vestido, data e hora da reserva. |
| `/aluguel/:id` | PUT | Atualizar aluguel | Atualiza os dados de um aluguel existente. |
| `/aluguel/desativa/:id` | PUT | Desativar aluguel | Desativa um aluguel, tornando-o indisponível. |
| `/aluguel/delete/:id` | DELETE | Remover aluguel (Rota não implementada) | Remove um aluguel completamente do sistema (**Rota não implementada no momento**). |

### Empresa

| Rota | Método HTTP | Descrição | Funcionalidade |
|---|---|---|---|
| `/empresas` | GET | Obter lista de empresas | Lista todas as empresas cadastradas, podendo ser paginada. |
| `/empresas/:id` | GET | Obter empresa por ID | Consulta uma empresa específica através do seu ID. |
| `/empresas` | POST | Criar nova empresa | Cadastra uma nova empresa com as informações de nome, CNPJ, endereço e telefone. |
| `/empresas/:id` | PUT | Atualizar empresa | Atualiza os dados de uma empresa existente. |
| `/empresas/:id` | DELETE | Remover empresa | Remove uma empresa completamente do sistema. |

### Usuários

| Rota | Método HTTP | Descrição | Funcionalidade |
|---|---|---|---|
| `/usuarios` | GET | Obter lista de usuários | Lista todos os usuários cadastrados, podendo ser paginada. |
| `/usuarios/:id` | GET | Obter usuário por ID | Consulta um usuário específico através do seu ID. |
| `/login` | POST | Fazer login | Autentica um usuário através do seu email e senha, retornando um token de acesso. |
| `/usuarios` | POST | Criar novo usuário | Cadastra um novo usuário com as informações de nome, email, senha e tipo de usuário (cliente ou administrador). |
| `/usuarios/:id` | PUT | Atualizar usuário | Atualiza os dados de um usuário existente. |
| `/usuarios/:id` | DELETE | Remover usuário | Remove um usuário completamente do sistema. |

### Vestidos

| Rota | Método HTTP | Descrição | Funcionalidade |
|---|---|---|---|
| `/vestidos` | GET | Obter lista de vestidos | Lista todos os vestidos cadastrados, podendo ser paginada. |
| `/vestidos/ativos` | GET | Obter lista de vestidos ativos | Lista apenas os vestidos que estão ativos, ou seja, disponíveis para aluguel. |
| `/vestidos/desativados` | GET | Obter lista de vestidos desativados | Lista apenas os vestidos que estão desativados, ou seja, indisponíveis para aluguel. |
| `/vestidos/busca` | GET | Buscar vestidos | Busca vestidos por nome, categoria, preço ou data de aquisição, podendo ser paginada. |
| `/vestidos/:id` | GET | Obter vestido por ID | Consulta um vestido específico através do seu ID. |
| `/vestidos` | POST | Criar novo vestido | Cadastra um novo vestido com as informações de nome, categoria, preço, descrição, cor, tamanho e imagens. |
| `/vestidos/:id` | PUT | Atualizar vestido | Atualiza os dados de um vestido existente. |
| `/vestidos/ativa/:id` | PUT | Ativar vestido | Ativa um vestido que está desativado, tornando-o disponível para aluguel. |
| `/vestidos/desativa/:id` | PUT | Desativar vestido | Desativa um vestido que está ativo, tornando-o indisponível para aluguel. |



### Contribuição

Se você deseja contribuir para o desenvolvimento deste projeto, por favor, faça um fork do repositório, crie um branch para suas alterações e envie um pull request. Todas as contribuições são bem-vindas!

### Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

### Contato

Sinta-se à vontade para entrar em contato se tiver dúvidas ou precisar de ajuda.

**[Leonardo Reis Simião](https://github.com/LeonardoReisSimiao)**

**[Perfil do LinkedIn](https://www.linkedin.com/in/leonardo-simiao/)**
