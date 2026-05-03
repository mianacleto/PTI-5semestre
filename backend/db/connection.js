const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dataDir = path.join(__dirname, '..', 'data');
const dbFile = path.join(dataDir, 'app.db');
const jsonFile = path.join(dataDir, 'db.json');
const schemaFile = path.join(dataDir, 'schema.sql');
const seedFile = path.join(dataDir, 'seed.sql');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbFile);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        lastID: this.lastID,
        changes: this.changes
      });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });
}

function exec(sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

async function initializeDatabase() {
  const schemaSql = fs.readFileSync(schemaFile, 'utf8');
  await exec(schemaSql);

  const tableInfo = await get(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'produtos'"
  );

  if (!tableInfo) {
    return;
  }

  const count = await get('SELECT COUNT(*) AS total FROM produtos');
  if (count && count.total > 0) {
    return;
  }

  if (fs.existsSync(jsonFile)) {
    const sourceData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    await importJsonData(sourceData);
    return;
  }

  const seedSql = fs.readFileSync(seedFile, 'utf8');
  await exec(seedSql);
}

async function importJsonData(data) {
  await exec('BEGIN TRANSACTION');

  try {
    for (const produto of data.produtos || []) {
      await run(
        `
          INSERT OR IGNORE INTO produtos (id, nome, preco, imagem, categoria)
          VALUES (?, ?, ?, ?, ?)
        `,
        [produto.id, produto.nome, produto.preco, produto.imagem, produto.categoria]
      );
    }

    for (const farmacia of data.farmacias || []) {
      await run(
        `
          INSERT OR IGNORE INTO farmacias (
            id,
            nome,
            email,
            senha,
            cnpj,
            telefone,
            endereco,
            foto_perfil,
            avaliacao,
            taxa,
            tempo_entrega,
            status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          farmacia.id,
          farmacia.nome,
          farmacia.email,
          farmacia.senha,
          farmacia.cnpj,
          farmacia.telefone,
          farmacia.endereco,
          farmacia.fotoPerfil,
          farmacia.avaliacao,
          farmacia.taxa,
          farmacia.tempoEntrega,
          farmacia.status
        ]
      );

      for (const produtoId of farmacia.produtos || []) {
        await run(
          'INSERT OR IGNORE INTO farmacia_produtos (farmacia_id, produto_id) VALUES (?, ?)',
          [farmacia.id, produtoId]
        );
      }
    }

    for (const cliente of data.clientes || []) {
      await run(
        `
          INSERT OR IGNORE INTO clientes (
            id,
            email,
            senha,
            nome,
            cpf,
            telefone,
            endereco,
            foto_perfil
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          cliente.id,
          cliente.email,
          cliente.senha,
          cliente.nome,
          cliente.cpf,
          cliente.telefone,
          cliente.endereco,
          cliente.fotoPerfil
        ]
      );

      for (const endereco of cliente.enderecos || []) {
        await run(
          `
            INSERT OR IGNORE INTO cliente_enderecos (id, cliente_id, nome, rua, bairro)
            VALUES (?, ?, ?, ?, ?)
          `,
          [endereco.id, cliente.id, endereco.nome, endereco.rua, endereco.bairro]
        );
      }
    }

    await exec('COMMIT');
  } catch (error) {
    await exec('ROLLBACK');
    throw error;
  }
}

module.exports = {
  db,
  dbFile,
  run,
  get,
  all,
  exec,
  initializeDatabase
};
