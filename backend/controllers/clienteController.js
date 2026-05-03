const {
  addEnderecoCliente,
  getClienteById,
  updateCliente
} = require('../db/repositories');

exports.atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  try {
    const cliente = await updateCliente(parseInt(id, 10), { nome, email, telefone });

    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    return res.json({ sucesso: true, cliente });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno' });
  }
};

exports.adicionarEndereco = async (req, res) => {
  const { id } = req.params;
  const { nome, rua, bairro } = req.body;

  try {
    const cliente = await getClienteById(parseInt(id, 10));

    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    const novoEndereco = await addEnderecoCliente(parseInt(id, 10), { nome, rua, bairro });
    return res.json({ sucesso: true, endereco: novoEndereco });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno' });
  }
};
