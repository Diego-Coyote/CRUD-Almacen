const productoServicio = require('../servicios/productoServicio');

function validarProducto(datos) {
  const codigo = String(datos.codigo || '').trim();
  const nombre = String(datos.nombre || '').trim();
  const descripcion = String(datos.descripcion || '').trim();
  const cantidad = Number(datos.cantidad);
  const precio = Number(datos.precio);

  if (!codigo || !nombre) return { error: 'El código y el nombre son obligatorios.' };
  if (!Number.isInteger(cantidad) || cantidad < 0) return { error: 'La cantidad debe ser un número entero mayor o igual a cero.' };
  if (!Number.isFinite(precio) || precio < 0) return { error: 'El precio debe ser un número mayor o igual a cero.' };

  return { producto: { codigo, nombre, descripcion, cantidad, precio } };
}

async function listar(req, res, next) {
  try {
    const productos = await productoServicio.listar();
    res.json(productos);
  } catch (error) {
    next(error);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    const producto = await productoServicio.obtenerPorId(Number(req.params.id));
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    res.json(producto);
  } catch (error) {
    next(error);
  }
}

async function crear(req, res, next) {
  try {
    const validacion = validarProducto(req.body);
    if (validacion.error) return res.status(400).json({ mensaje: validacion.error });

    const producto = await productoServicio.crear(validacion.producto);
    res.status(201).json({ mensaje: 'Producto creado correctamente.', producto });
  } catch (error) {
    next(error);
  }
}

async function actualizar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const validacion = validarProducto(req.body);
    if (validacion.error) return res.status(400).json({ mensaje: validacion.error });

    const producto = await productoServicio.actualizar(id, validacion.producto);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado.' });

    res.json({ mensaje: 'Producto actualizado correctamente.', producto });
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const producto = await productoServicio.eliminar(Number(req.params.id));
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado.' });

    res.json({ mensaje: 'Producto eliminado correctamente.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
