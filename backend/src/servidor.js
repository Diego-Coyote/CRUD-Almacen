require('dotenv').config();
const app = require('./aplicacion');
const { obtenerConexion } = require('./configuracion/baseDatos');

const puerto = Number(process.env.PUERTO || 3000);

async function iniciarServidor() {
  try {
    if (!process.env.JWT_SECRETO) {
      throw new Error('Falta configurar JWT_SECRETO en el archivo .env.');
    }

    await obtenerConexion();
    console.log('Conexión con SQL Server establecida.');

    app.listen(puerto, () => {
      console.log(`Servidor disponible en http://localhost:${puerto}`);
    });
  } catch (error) {
    console.error('No fue posible iniciar la aplicación:', error.message);
    process.exit(1);
  }
}

iniciarServidor();
