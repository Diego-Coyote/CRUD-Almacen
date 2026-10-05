const express = require('express');
const controlador = require('../controladores/autenticacionControlador');
const { verificarAutenticacion } = require('../middlewares/autenticacion');

const router = express.Router();

router.post('/registrar', controlador.registrar);
router.post('/iniciar-sesion', controlador.iniciarSesion);
router.get('/sesion', verificarAutenticacion, controlador.obtenerSesion);
router.post('/cerrar-sesion', controlador.cerrarSesion);

module.exports = router;
