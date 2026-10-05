function rutaNoEncontrada(req, res) {
  res.status(404).json({ mensaje: 'La ruta solicitada no existe.' });
}

function manejarErrores(error, req, res, next) {
  console.error(error);

  if (error.number === 2627 || error.number === 2601) {
    return res.status(409).json({ mensaje: 'Ya existe un registro con esos datos únicos.' });
  }

  return res.status(500).json({ mensaje: 'Ocurrió un error interno en el servidor.' });
}

module.exports = { rutaNoEncontrada, manejarErrores };
