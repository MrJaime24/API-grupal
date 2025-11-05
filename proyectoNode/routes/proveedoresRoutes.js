const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');

// Rutas para proveedores
router.get('/', proveedoresController.obtenerTodos);
router.get('/:id', proveedoresController.obtenerPorId);
router.post('/', proveedoresController.crear);
router.put('/:id', proveedoresController.actualizar);
router.delete('/:id', proveedoresController.eliminar);

module.exports = router;
