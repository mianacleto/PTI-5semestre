const {
  getAllProdutos,
  getFarmaciaById,
  getProdutosByFarmaciaId
} = require('../db/repositories');

exports.getProdutos = async (req, res) => {
  const farmaciaId = parseInt(req.query.farmaciaId, 10);

  try {
    if (!farmaciaId) {
      const produtos = await getAllProdutos();
      return res.json(produtos);
    }

    const farmacia = await getFarmaciaById(farmaciaId);
    if (!farmacia) {
      return res.status(404).json({ mensagem: 'Farmácia não encontrada.' });
    }

    const produtos = await getProdutosByFarmaciaId(farmaciaId);
    return res.json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro ao buscar produtos.' });
  }
};
