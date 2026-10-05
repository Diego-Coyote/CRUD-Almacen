const express = require('express');
const controlador = require('../controladores/productoControlador');
const { verificarAutenticacion } = require('../middlewares/autenticacion');

const router = express.Router();
router.use(verificarAutenticacion);

router.get('/', controlador.listar);
router.get('/:id', controlador.obtenerPorId);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.delete('/:id', controlador.eliminar);

module.exports = router;
