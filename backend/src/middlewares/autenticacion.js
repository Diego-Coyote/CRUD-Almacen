const jwt = require('jsonwebtoken');

function verificarAutenticacion(req, res, next) {
  const token = req.cookies.token_acceso;

  if (!token) {
    return res.status(401).json({ mensaje: 'Debes iniciar sesión para continuar.' });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRETO);
    next();
  } catch {
    return res.status(401).json({ mensaje: 'La sesión no es válida o ha expirado.' });
  }
}

module.exports = { verificarAutenticacion };
