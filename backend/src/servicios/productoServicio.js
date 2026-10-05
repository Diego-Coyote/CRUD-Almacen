const { sql, obtenerConexion } = require('../configuracion/baseDatos');

async function listar() {
  const conexion = await obtenerConexion();
  const resultado = await conexion.request().execute('sp_Producto_Listar');
  return resultado.recordset;
}

async function obtenerPorId(id) {
  const conexion = await obtenerConexion();
  const resultado = await conexion.request()
    .input('IdProducto', sql.Int, id)
    .execute('sp_Producto_ObtenerPorId');

  return resultado.recordset[0] || null;
}

async function crear(producto) {
  const conexion = await obtenerConexion();
  const resultado = await conexion.request()
    .input('Codigo', sql.VarChar(30), producto.codigo)
    .input('Nombre', sql.VarChar(120), producto.nombre)
    .input('Descripcion', sql.VarChar(250), producto.descripcion || null)
    .input('Cantidad', sql.Int, producto.cantidad)
    .input('Precio', sql.Decimal(10, 2), producto.precio)
    .execute('sp_Producto_Crear');

  return resultado.recordset[0];
}

async function actualizar(id, producto) {
  const conexion = await obtenerConexion();
  const resultado = await conexion.request()
    .input('IdProducto', sql.Int, id)
    .input('Codigo', sql.VarChar(30), producto.codigo)
    .input('Nombre', sql.VarChar(120), producto.nombre)
    .input('Descripcion', sql.VarChar(250), producto.descripcion || null)
    .input('Cantidad', sql.Int, producto.cantidad)
    .input('Precio', sql.Decimal(10, 2), producto.precio)
    .execute('sp_Producto_Actualizar');

  return resultado.recordset[0] || null;
}

async function eliminar(id) {
  const conexion = await obtenerConexion();
  const resultado = await conexion.request()
    .input('IdProducto', sql.Int, id)
    .execute('sp_Producto_Eliminar');

  return resultado.recordset[0] || null;
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
