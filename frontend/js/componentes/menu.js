export function renderizarMenu(contenedor, usuario) {
  contenedor.innerHTML = `
    <header class="barra-superior">
      <a href="/almacen" class="marca-menu">Almacén</a>
      <nav class="navegacion">
        <a href="/almacen" class="enlace-activo">Productos</a>
      </nav>
      <div class="usuario-menu">
        <span>${escaparHtml(usuario.nombre || 'Usuario')}</span>
        <button id="botonCerrarSesion" class="boton boton-secundario boton-pequeno">Salir</button>
      </div>
    </header>
  `;
}

function escaparHtml(valor) {
  return String(valor)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
