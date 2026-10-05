async function solicitud(ruta, opciones = {}) {
  const respuesta = await fetch(ruta, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...(opciones.headers || {})
    },
    ...opciones
  });

  let datos = null;
  try {
    datos = await respuesta.json();
  } catch {
    datos = {};
  }

  if (!respuesta.ok) {
    const error = new Error(datos.mensaje || 'No fue posible completar la solicitud.');
    error.estado = respuesta.status;
    throw error;
  }

  return datos;
}

export const api = {
  registrarUsuario: (datos) => solicitud('/api/autenticacion/registrar', {
    method: 'POST', body: JSON.stringify(datos)
  }),
  iniciarSesion: (credenciales) => solicitud('/api/autenticacion/iniciar-sesion', {
    method: 'POST', body: JSON.stringify(credenciales)
  }),
  obtenerSesion: () => solicitud('/api/autenticacion/sesion'),
  cerrarSesion: () => solicitud('/api/autenticacion/cerrar-sesion', { method: 'POST' }),
  listarProductos: () => solicitud('/api/productos'),
  crearProducto: (producto) => solicitud('/api/productos', {
    method: 'POST', body: JSON.stringify(producto)
  }),
  actualizarProducto: (id, producto) => solicitud(`/api/productos/${id}`, {
    method: 'PUT', body: JSON.stringify(producto)
  }),
  eliminarProducto: (id) => solicitud(`/api/productos/${id}`, { method: 'DELETE' })
};
