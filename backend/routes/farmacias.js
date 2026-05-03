const express = require('express');
const router = express.Router();
const farmaciaController = require('../controllers/farmaciaController');

router.get('/', farmaciaController.getAll);
router.get('/:id', farmaciaController.getById);
router.post('/', farmaciaController.create);
router.put('/:id', farmaciaController.update);
router.delete('/:id', farmaciaController.remove);

module.exports = router;