# PTI 5º Semestre

Projeto com frontend estático (HTML, CSS e JavaScript) consumindo uma API backend em Node.js/Express para fluxo de farmácia delivery. O frontend é servido pelo próprio backend, e os dados da aplicação são persistidos em banco SQLite.

## Integrantes

- Christopher Gois Agudelo
- Gabriel Henrique Alves Raposo
- Guilherme Donelli Pires
- Guilherme Henrique Carvalho Teixeira Silva
- Mirella Anacleto das Dores
- Yan Carlos dos Santos Rodrigues

## Estrutura do projeto

```text
PTI-5semestre/
|-- server.js
|-- package.json
|-- backend/
|   |-- controllers/
|   |-- data/
|   |   |-- schema.sql
|   |   |-- seed.sql
|   |-- db/
|   |-- media/
|   `-- routes/
|-- frontend/
|   |-- index.html
|   |-- login.html
|   |-- farmacia.html
|   `-- ...
`-- README.md
```

## Tecnologias utilizadas

- Node.js
- npm
- Express
- CORS
- SQLite
- HTML, CSS e JavaScript
- Leaflet

## Requisitos do ambiente

- npm 9 ou superior
- Node.js 18 ou superior

## Como preparar o ambiente

### Clone o repositório

```bash
git clone https://github.com/grupopti192-cpu/PTI-5semestre
```

### Abra o projeto

```bash
cd PTI-5semestre
```

### Instale as dependências

```bash
npm install
```

Esse comando instala:

- `express`: servidor HTTP e roteamento
- `cors`: liberação de acesso entre frontend e backend
- `sqlite3`: persistência de dados em banco SQLite

## Como executar o projeto

Com as dependências instaladas inicie o servidor:

```bash
npm start
```

Essa script executa o `server.js` que na sua primeira execução:

- cria o arquivo SQLite em `backend/data/app.db`
- cria as tabelas com base em `backend/data/schema.sql`
- importa os dados existentes de `backend/data/db.json`, quando esse arquivo estiver presente
- usa `backend/data/seed.sql` como carga inicial de fallback quando não houver `db.json`

Se tudo estiver correto, o terminal exibirá:

```text
http://localhost:3000
```

Abra esse endereço no navegador:

```text
http://localhost:3000
```

## Frontend

- O frontend não requer build ou instalação adicional.
- Os arquivos estáticos são servidos automaticamente pelo backend Express.

## Principais Endpoints

- `GET /farmacias` - Lista as farmácias disponíveis cadastradas no sistema  
- `GET /produtos` - Lista os produtos disponíveis para consulta/compra  
- `POST /login` - Realiza autenticação de usuário no sistema  
