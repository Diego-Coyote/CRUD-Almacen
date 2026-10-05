const sql = require('mssql');

const configuracion = {
  user: process.env.BD_USUARIO,
  password: process.env.BD_CONTRASENA,
  server: process.env.BD_SERVIDOR,
  port: Number(process.env.BD_PUERTO || 1433),
  database: process.env.BD_NOMBRE,
  options: {
    encrypt: process.env.BD_ENCRIPTAR === 'true',
    trustServerCertificate: process.env.BD_CONFIAR_CERTIFICADO !== 'false'
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let conexion;

async function obtenerConexion() {
  if (!conexion) {
    conexion = await sql.connect(configuracion);
  }
  return conexion;
}

module.exports = { sql, obtenerConexion };
