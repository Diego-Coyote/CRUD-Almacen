import { api } from './api.js';
import { renderizarMenu } from './componentes/menu.js';

const contenedorMenu = document.getElementById('contenedorMenu');
const cuerpoTabla = document.getElementById('cuerpoTablaProductos');
const mensajeTabla = document.getElementById('mensajeTabla');
const modal = document.getElementById('modalProducto');
const formulario = document.getElementById('formularioProducto');
const tituloModal = document.getElementById('tituloModal');
const mensajeFormulario = document.getElementById('mensajeFormulario');

inicializar();

async function inicializar() {
  try {
    const sesion = await api.obtenerSesion();
    renderizarMenu(contenedorMenu, sesion.usuario);
    document.getElementById('botonCerrarSesion').addEventListener('click', cerrarSesion);
    await cargarProductos();
  } catch {
    window.location.href = '/';
  }
}

async function cargarProductos() {
  try {
    const productos = await api.listarProductos();
    dibujarTabla(productos);
  } catch (error) {
    if (error.estado === 401) return window.location.href = '/';
    mensajeTabla.textContent = error.message;
  }
}

function dibujarTabla(productos) {
  cuerpoTabla.innerHTML = '';

  if (!productos.length) {
    mensajeTabla.textContent = 'No hay productos registrados.';
    return;
  }

  mensajeTabla.textContent = '';
  productos.forEach((producto) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${escaparHtml(producto.Codigo)}</td>
      <td>${escaparHtml(producto.Nombre)}</td>
      <td>${escaparHtml(producto.Descripcion || '-')}</td>
      <td>${producto.Cantidad}</td>
      <td>Q ${Number(producto.Precio).toFixed(2)}</td>
      <td class="acciones-tabla">
        <button class="boton-enlace" data-accion="editar">Editar</button>
        <button class="boton-enlace boton-peligro-texto" data-accion="eliminar">Eliminar</button>
      </td>`;

    fila.querySelector('[data-accion="editar"]').addEventListener('click', () => abrirModal(producto));
    fila.querySelector('[data-accion="eliminar"]').addEventListener('click', () => eliminarProducto(producto));
    cuerpoTabla.appendChild(fila);
  });
}

function abrirModal(producto = null) {
  formulario.reset();
  mensajeFormulario.textContent = '';
  document.getElementById('idProducto').value = producto?.IdProducto || '';
  tituloModal.textContent = producto ? 'Editar producto' : 'Nuevo producto';

  if (producto) {
    document.getElementById('codigo').value = producto.Codigo;
    document.getElementById('nombre').value = producto.Nombre;
    document.getElementById('descripcion').value = producto.Descripcion || '';
    document.getElementById('cantidad').value = producto.Cantidad;
    document.getElementById('precio').value = producto.Precio;
  }

  modal.classList.remove('oculto');
}

function cerrarModal() {
  modal.classList.add('oculto');
}

document.getElementById('botonNuevo').addEventListener('click', () => abrirModal());
document.getElementById('botonCerrarModal').addEventListener('click', cerrarModal);
document.getElementById('botonCancelar').addEventListener('click', cerrarModal);

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensajeFormulario.textContent = '';

  const id = document.getElementById('idProducto').value;
  const producto = {
    codigo: document.getElementById('codigo').value.trim(),
    nombre: document.getElementById('nombre').value.trim(),
    descripcion: document.getElementById('descripcion').value.trim(),
    cantidad: Number(document.getElementById('cantidad').value),
    precio: Number(document.getElementById('precio').value)
  };

  try {
    if (id) await api.actualizarProducto(id, producto);
    else await api.crearProducto(producto);

    cerrarModal();
    await cargarProductos();
  } catch (error) {
    mensajeFormulario.textContent = error.message;
    mensajeFormulario.className = 'mensaje mensaje-error';
  }
});

async function eliminarProducto(producto) {
  const confirmar = window.confirm(`¿Deseas eliminar "${producto.Nombre}"?`);
  if (!confirmar) return;

  try {
    await api.eliminarProducto(producto.IdProducto);
    await cargarProductos();
  } catch (error) {
    window.alert(error.message);
  }
}

async function cerrarSesion() {
  await api.cerrarSesion();
  window.location.href = '/';
}

function escaparHtml(valor) {
  return String(valor)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
