import { api } from './api.js';

const formulario = document.getElementById('formularioLogin');
const mensaje = document.getElementById('mensajeLogin');

verificarSesionExistente();

async function verificarSesionExistente() {
  try {
    await api.obtenerSesion();
    window.location.href = '/almacen';
  } catch {
    // Si no hay sesión, el usuario permanece en el formulario de ingreso.
  }
}

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensaje.textContent = '';

  const correo = document.getElementById('correo').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  try {
    await api.iniciarSesion({ correo, contrasena });
    window.location.href = '/almacen';
  } catch (error) {
    mensaje.textContent = error.message;
    mensaje.className = 'mensaje mensaje-error';
  }
});
