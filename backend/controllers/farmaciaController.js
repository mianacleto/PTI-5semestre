const {
  createFarmacia,
  getAllFarmacias,
  getFarmaciaById,
  removeFarmacia,
  updateFarmacia
} = require('../db/repositories');

exports.getAll = async (req, res) => {
  try {
    const farmacias = await getAllFarmacias();
    return res.json(farmacias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar farmácias' });
  }
};

exports.getById = async (req, res) => {
  try {
    const farmacia = await getFarmaciaById(parseInt(req.params.id, 10));
    if (!farmacia) {
      return res.status(404).json({ message: 'Farmácia não encontrada' });
    }

    return res.json(farmacia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar farmácia' });
  }
};

exports.create = async (req, res) => {
  try {
    const nova = await createFarmacia(req.body);
    return res.status(201).json(nova);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar farmácia' });
  }
};

exports.update = async (req, res) => {
  try {
    const farmacia = await updateFarmacia(parseInt(req.params.id, 10), req.body);
    if (!farmacia) {
      return res.status(404).json({ message: 'Farmácia não encontrada' });
    }

    return res.json(farmacia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar farmácia' });
  }
};

exports.remove = async (req, res) => {
  try {
    const removed = await removeFarmacia(parseInt(req.params.id, 10));
    if (!removed) {
      return res.status(404).json({ message: 'Farmácia não encontrada' });
    }

    return res.json({ message: 'Farmácia excluída.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir farmácia' });
  }
};
