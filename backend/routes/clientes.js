const express = require('express');
const router = express.Router();
const { getClienteById, updateCliente } = require('../db/repositories');

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { nome, email, telefone, endereco } = req.body;
    const cliente = await updateCliente(id, { nome, email, telefone, endereco });

    if (!cliente) {
      return res.status(404).json({ sucesso: false, mensagem: 'Cliente não encontrado' });
    }

    return res.json({ sucesso: true, cliente });
  } catch (err) {
    console.error('Erro PUT /clientes/:id', err);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro interno' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const cliente = await getClienteById(id);
    if (!cliente) {
      return res.status(404).json({ sucesso: false, mensagem: 'Cliente não encontrado' });
    }

    return res.json(cliente);
  } catch (err) {
    console.error('Erro GET /clientes/:id', err);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro interno' });
  }
});

module.exports = router;
