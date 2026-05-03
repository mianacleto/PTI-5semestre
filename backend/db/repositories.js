const { all, get, run } = require('./connection');

function parseProdutoIds(produtos) {
  if (!produtos) {
    return [];
  }

  return produtos
    .split(',')
    .filter(Boolean)
    .map((id) => Number(id));
}

function mapFarmacia(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    nome: row.nome,
    email: row.email,
    senha: row.senha,
    cnpj: row.cnpj,
    telefone: row.telefone,
    endereco: row.endereco,
    fotoPerfil: row.foto_perfil,
    avaliacao: row.avaliacao,
    taxa: row.taxa,
    tempoEntrega: row.tempo_entrega,
    status: row.status,
    produtos: parseProdutoIds(row.produtos)
  };
}

function mapCliente(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    email: row.email,
    senha: row.senha,
    nome: row.nome,
    cpf: row.cpf,
    telefone: row.telefone,
    endereco: row.endereco,
    fotoPerfil: row.foto_perfil
  };
}

function mapProduto(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    nome: row.nome,
    preco: row.preco,
    imagem: row.imagem,
    categoria: row.categoria
  };
}

async function getAllFarmacias() {
  const rows = await all(`
    SELECT
      f.id,
      f.nome,
      f.email,
      f.senha,
      f.cnpj,
      f.telefone,
      f.endereco,
      f.foto_perfil,
      f.avaliacao,
      f.taxa,
      f.tempo_entrega,
      f.status,
      GROUP_CONCAT(fp.produto_id) AS produtos
    FROM farmacias f
    LEFT JOIN farmacia_produtos fp ON fp.farmacia_id = f.id
    GROUP BY f.id
    ORDER BY f.id
  `);

  return rows.map(mapFarmacia);
}

async function getFarmaciaById(id) {
  const row = await get(
    `
      SELECT
        f.id,
        f.nome,
        f.email,
        f.senha,
        f.cnpj,
        f.telefone,
        f.endereco,
        f.foto_perfil,
        f.avaliacao,
        f.taxa,
        f.tempo_entrega,
        f.status,
        GROUP_CONCAT(fp.produto_id) AS produtos
      FROM farmacias f
      LEFT JOIN farmacia_produtos fp ON fp.farmacia_id = f.id
      WHERE f.id = ?
      GROUP BY f.id
    `,
    [id]
  );

  return mapFarmacia(row);
}

async function createFarmacia(data) {
  const result = await run(
    `
      INSERT INTO farmacias (
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.nome,
      data.email,
      data.senha,
      data.cnpj,
      data.telefone,
      data.endereco,
      data.fotoPerfil,
      data.avaliacao,
      data.taxa,
      data.tempoEntrega,
      data.status
    ]
  );

  if (Array.isArray(data.produtos) && data.produtos.length > 0) {
    for (const produtoId of data.produtos) {
      await run(
        'INSERT INTO farmacia_produtos (farmacia_id, produto_id) VALUES (?, ?)',
        [result.lastID, produtoId]
      );
    }
  }

  return getFarmaciaById(result.lastID);
}

async function updateFarmacia(id, data) {
  const farmaciaAtual = await getFarmaciaById(id);

  if (!farmaciaAtual) {
    return null;
  }

  const farmaciaAtualizada = {
    ...farmaciaAtual,
    ...data
  };

  await run(
    `
      UPDATE farmacias
      SET
        nome = ?,
        email = ?,
        senha = ?,
        cnpj = ?,
        telefone = ?,
        endereco = ?,
        foto_perfil = ?,
        avaliacao = ?,
        taxa = ?,
        tempo_entrega = ?,
        status = ?
      WHERE id = ?
    `,
    [
      farmaciaAtualizada.nome,
      farmaciaAtualizada.email,
      farmaciaAtualizada.senha,
      farmaciaAtualizada.cnpj,
      farmaciaAtualizada.telefone,
      farmaciaAtualizada.endereco,
      farmaciaAtualizada.fotoPerfil,
      farmaciaAtualizada.avaliacao,
      farmaciaAtualizada.taxa,
      farmaciaAtualizada.tempoEntrega,
      farmaciaAtualizada.status,
      id
    ]
  );

  if (Array.isArray(data.produtos)) {
    await run('DELETE FROM farmacia_produtos WHERE farmacia_id = ?', [id]);

    for (const produtoId of data.produtos) {
      await run(
        'INSERT INTO farmacia_produtos (farmacia_id, produto_id) VALUES (?, ?)',
        [id, produtoId]
      );
    }
  }

  return getFarmaciaById(id);
}

async function removeFarmacia(id) {
  const result = await run('DELETE FROM farmacias WHERE id = ?', [id]);
  return result.changes > 0;
}

async function getAllProdutos() {
  const rows = await all('SELECT id, nome, preco, imagem, categoria FROM produtos ORDER BY id');
  return rows.map(mapProduto);
}

async function getProdutosByFarmaciaId(farmaciaId) {
  const rows = await all(
    `
      SELECT p.id, p.nome, p.preco, p.imagem, p.categoria
      FROM produtos p
      INNER JOIN farmacia_produtos fp ON fp.produto_id = p.id
      WHERE fp.farmacia_id = ?
      ORDER BY p.id
    `,
    [farmaciaId]
  );

  return rows.map(mapProduto);
}

async function getClienteByEmail(email) {
  const row = await get(
    'SELECT id, email, senha, nome, cpf, telefone, endereco, foto_perfil FROM clientes WHERE email = ?',
    [email]
  );

  return mapCliente(row);
}

async function getClienteById(id) {
  const row = await get(
    'SELECT id, email, senha, nome, cpf, telefone, endereco, foto_perfil FROM clientes WHERE id = ?',
    [id]
  );

  return mapCliente(row);
}

async function createCliente(data) {
  const result = await run(
    `
      INSERT INTO clientes (email, senha, nome, cpf, telefone, endereco, foto_perfil)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.email,
      data.senha,
      data.nome,
      data.cpf,
      data.telefone,
      data.endereco,
      data.fotoPerfil
    ]
  );

  return getClienteById(result.lastID);
}

async function updateCliente(id, data) {
  const clienteAtual = await getClienteById(id);

  if (!clienteAtual) {
    return null;
  }

  const clienteAtualizado = {
    ...clienteAtual,
    ...data
  };

  await run(
    `
      UPDATE clientes
      SET nome = ?, email = ?, telefone = ?, endereco = ?, senha = ?, cpf = ?, foto_perfil = ?
      WHERE id = ?
    `,
    [
      clienteAtualizado.nome,
      clienteAtualizado.email,
      clienteAtualizado.telefone,
      clienteAtualizado.endereco,
      clienteAtualizado.senha,
      clienteAtualizado.cpf,
      clienteAtualizado.fotoPerfil,
      id
    ]
  );

  return getClienteById(id);
}

async function addEnderecoCliente(clienteId, endereco) {
  const result = await run(
    `
      INSERT INTO cliente_enderecos (cliente_id, nome, rua, bairro)
      VALUES (?, ?, ?, ?)
    `,
    [clienteId, endereco.nome, endereco.rua, endereco.bairro]
  );

  return {
    id: result.lastID,
    ...endereco
  };
}

async function getFarmaciaByEmail(email) {
  const row = await get(
    `
      SELECT
        f.id,
        f.nome,
        f.email,
        f.senha,
        f.cnpj,
        f.telefone,
        f.endereco,
        f.foto_perfil,
        f.avaliacao,
        f.taxa,
        f.tempo_entrega,
        f.status,
        GROUP_CONCAT(fp.produto_id) AS produtos
      FROM farmacias f
      LEFT JOIN farmacia_produtos fp ON fp.farmacia_id = f.id
      WHERE f.email = ?
      GROUP BY f.id
    `,
    [email]
  );

  return mapFarmacia(row);
}

module.exports = {
  addEnderecoCliente,
  createCliente,
  createFarmacia,
  getAllFarmacias,
  getAllProdutos,
  getClienteByEmail,
  getClienteById,
  getFarmaciaByEmail,
  getFarmaciaById,
  getProdutosByFarmaciaId,
  removeFarmacia,
  updateCliente,
  updateFarmacia
};
