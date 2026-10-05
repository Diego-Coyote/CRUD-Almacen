require('dotenv').config();
const bcrypt = require('bcryptjs');
const usuarioServicio = require('../servicios/usuarioServicio');

async function crearAdministrador() {
  try {
    const nombre = process.env.ADMIN_NOMBRE;
    const correo = String(process.env.ADMIN_CORREO || '').trim().toLowerCase();
    const contrasena = process.env.ADMIN_CONTRASENA;

    if (!nombre || !correo || !contrasena) {
      throw new Error('Configura ADMIN_NOMBRE, ADMIN_CORREO y ADMIN_CONTRASENA en .env.');
    }

    const existente = await usuarioServicio.obtenerPorCorreo(correo);
    if (existente) {
      console.log('El usuario administrador ya existe.');
      process.exit(0);
    }

    const contrasenaHash = await bcrypt.hash(contrasena, 12);
    const usuario = await usuarioServicio.crearUsuario({ nombre, correo, contrasenaHash });
    console.log(`Administrador creado: ${usuario.Correo}`);
    process.exit(0);
  } catch (error) {
    console.error('Error al crear el administrador:', error.message);
    process.exit(1);
  }
}

crearAdministrador();
