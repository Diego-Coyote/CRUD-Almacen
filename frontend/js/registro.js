import { api } from './api.js';

const formulario = document.getElementById('formularioRegistro');
const mensaje = document.getElementById('mensajeRegistro');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensaje.textContent = '';
  mensaje.className = 'mensaje';

  const correo = document.getElementById('correo').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  try {
    const respuesta = await api.registrarUsuario({ correo, contrasena });
    mensaje.textContent = respuesta.mensaje;
    mensaje.className = 'mensaje mensaje-exito';
    formulario.reset();

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    mensaje.textContent = error.message;
    mensaje.className = 'mensaje mensaje-error';
  }
});
