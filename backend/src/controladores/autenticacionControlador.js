const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioServicio = require('../servicios/usuarioServicio');

async function iniciarSesion(req, res, next) {
  try {
    const correo = String(req.body.correo || '').trim().toLowerCase();
    const contrasena = String(req.body.contrasena || '');

    if (!correo || !contrasena) {
      return res.status(400).json({ mensaje: 'El correo y la contraseña son obligatorios.' });
    }

    const usuario = await usuarioServicio.obtenerPorCorreo(correo);

    if (!usuario || !usuario.Activo) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.ContrasenaHash);
    if (!contrasenaValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    const token = jwt.sign(
      { idUsuario: usuario.IdUsuario, nombre: usuario.Nombre, correo: usuario.Correo },
      process.env.JWT_SECRETO,
      { expiresIn: process.env.JWT_EXPIRACION || '2h' }
    );

    res.cookie('token_acceso', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.COOKIE_SEGURA === 'true',
      maxAge: 2 * 60 * 60 * 1000
    });

    return res.json({
      mensaje: 'Inicio de sesión correcto.',
      usuario: { idUsuario: usuario.IdUsuario, nombre: usuario.Nombre, correo: usuario.Correo }
    });
  } catch (error) {
    next(error);
  }
}

async function registrar(req, res, next) {
  try {
    const correo = String(req.body.correo || '').trim().toLowerCase();
    const contrasena = String(req.body.contrasena || '');

    if (!correo || !contrasena) {
      return res.status(400).json({ mensaje: 'El correo y la contraseña son obligatorios.' });
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
      return res.status(400).json({ mensaje: 'Ingresa un correo electrónico válido.' });
    }

    if (contrasena.length < 6) {
      return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    const existente = await usuarioServicio.obtenerPorCorreo(correo);
    if (existente) {
      return res.status(409).json({ mensaje: 'Ya existe un usuario con ese correo.' });
    }

    // La tabla Usuarios requiere Nombre. Como el formulario solicitado solo tiene
    // correo y contraseña, se usa la parte anterior al @ como nombre interno.
    const nombre = correo.split('@')[0].substring(0, 120);
    const contrasenaHash = await bcrypt.hash(contrasena, 12);

    await usuarioServicio.crearUsuario({ nombre, correo, contrasenaHash });

    return res.status(201).json({ mensaje: 'Usuario registrado correctamente.' });
  } catch (error) {
    next(error);
  }
}

function obtenerSesion(req, res) {
  return res.json({ usuario: req.usuario });
}

function cerrarSesion(req, res) {
  res.clearCookie('token_acceso', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.COOKIE_SEGURA === 'true'
  });

  return res.json({ mensaje: 'Sesión cerrada correctamente.' });
}

module.exports = { iniciarSesion, registrar, obtenerSesion, cerrarSesion };
