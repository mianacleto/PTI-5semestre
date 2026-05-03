const express = require("express");
const router = express.Router();
const cadastroController = require("../controllers/cadastroController");

router.post("/cliente", cadastroController.cadastrarCliente);
router.post("/farmacia", cadastroController.cadastrarFarmacia);

module.exports = router;
