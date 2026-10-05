const { sql, obtenerConexion } = require('../configuracion/baseDatos');

async function obtenerPorCorreo(correo) {
  const conexion = await obtenerConexion();
  const resultado = await conexion.request()
    .input('Correo', sql.VarChar(150), correo)
    .execute('sp_Usuario_ObtenerPorCorreo');

  return resultado.recordset[0] || null;
}

async function crearUsuario({ nombre, correo, contrasenaHash }) {
  const conexion = await obtenerConexion();
  const resultado = await conexion.request()
    .input('Nombre', sql.VarChar(120), nombre)
    .input('Correo', sql.VarChar(150), correo)
    .input('ContrasenaHash', sql.VarChar(255), contrasenaHash)
    .execute('sp_Usuario_Crear');

  return resultado.recordset[0];
}

module.exports = { obtenerPorCorreo, crearUsuario };
