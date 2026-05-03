PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  preco REAL NOT NULL,
  imagem TEXT NOT NULL,
  categoria INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS farmacias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  telefone TEXT NOT NULL,
  endereco TEXT NOT NULL,
  foto_perfil TEXT NOT NULL,
  avaliacao REAL NOT NULL DEFAULT 0,
  taxa TEXT NOT NULL DEFAULT 'R$ 0,00',
  tempo_entrega TEXT NOT NULL DEFAULT 'Nao definido',
  status TEXT NOT NULL DEFAULT 'Fechado'
);

CREATE TABLE IF NOT EXISTS farmacia_produtos (
  farmacia_id INTEGER NOT NULL,
  produto_id INTEGER NOT NULL,
  PRIMARY KEY (farmacia_id, produto_id),
  FOREIGN KEY (farmacia_id) REFERENCES farmacias(id) ON DELETE CASCADE,
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL,
  telefone TEXT NOT NULL,
  endereco TEXT NOT NULL,
  foto_perfil TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cliente_enderecos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  rua TEXT NOT NULL,
  bairro TEXT NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);
