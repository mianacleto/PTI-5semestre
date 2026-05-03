const {
  createCliente,
  createFarmacia,
  getClienteByEmail,
  getFarmaciaByEmail,
  updateCliente,
} = require("../db/repositories");

exports.cadastrarCliente = async (req, res) => {
  const { email, senha, nome, cpf, telefone, endereco } = req.body;

  if (!email || !senha || !nome || !cpf || !telefone || !endereco) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  try {
    const clienteExistente = await getClienteByEmail(email);

    if (clienteExistente) {
      return res.status(400).json({ erro: "E-mail já cadastrado." });
    }

    await createCliente({
      email,
      senha,
      nome,
      cpf,
      telefone,
      endereco,
      fotoPerfil: "./media/cliente.png",
    });

    return res
      .status(201)
      .json({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao cadastrar cliente." });
  }
};

exports.atualizarCliente = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nome, email, telefone, endereco } = req.body;

  try {
    const cliente = await updateCliente(id, {
      nome,
      email,
      telefone,
      endereco,
    });

    if (!cliente) {
      return res
        .status(404)
        .json({ sucesso: false, mensagem: "Cliente não encontrado." });
    }

    return res.json({ sucesso: true, cliente });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ sucesso: false, mensagem: "Erro interno." });
  }
};

exports.cadastrarFarmacia = async (req, res) => {
  const { email, senha, nome, cnpj, telefone, endereco } = req.body;

  if (!email || !senha || !nome || !cnpj || !telefone || !endereco) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  try {
    const farmaciaExistente = await getFarmaciaByEmail(email);

    if (farmaciaExistente) {
      return res.status(400).json({ erro: "E-mail já cadastrado." });
    }

    await createFarmacia({
      email,
      senha,
      nome,
      cnpj,
      telefone,
      endereco,
      fotoPerfil: "./media/fornecedor.png",
      avaliacao: 0.0,
      taxa: "R$ 0,00",
      tempoEntrega: "Não definido",
      status: "Fechado",
      produtos: [],
    });

    return res
      .status(201)
      .json({ mensagem: "Farmácia cadastrada com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao cadastrar farmácia." });
  }
};
