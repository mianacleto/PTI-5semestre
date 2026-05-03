const { getClienteByEmail, getFarmaciaByEmail } = require('../db/repositories');

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const cliente = await getClienteByEmail(email);
    if (cliente && cliente.senha === senha) {
      return res.json({
        tipo: 'cliente',
        usuario: { id: cliente.id, email: cliente.email, nome: cliente.nome }
      });
    }

    const fornecedor = await getFarmaciaByEmail(email);
    if (fornecedor && fornecedor.senha === senha) {
      return res.json({
        tipo: 'fornecedor',
        usuario: { id: fornecedor.id, email: fornecedor.email, nome: fornecedor.nome }
      });
    }

    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao processar login.' });
  }
};
