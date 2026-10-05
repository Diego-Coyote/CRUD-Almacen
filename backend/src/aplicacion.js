const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const autenticacionRutas = require('./rutas/autenticacionRutas');
const productoRutas = require('./rutas/productoRutas');
const { rutaNoEncontrada, manejarErrores } = require('./middlewares/manejoErrores');

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/autenticacion', autenticacionRutas);
app.use('/api/productos', productoRutas);

const rutaFrontend = path.join(__dirname, '../../frontend');
app.use(express.static(rutaFrontend));

app.get('/', (req, res) => res.sendFile(path.join(rutaFrontend, 'index.html')));
app.get('/registro', (req, res) => res.sendFile(path.join(rutaFrontend, 'registro.html')));
app.get('/almacen', (req, res) => res.sendFile(path.join(rutaFrontend, 'almacen.html')));

app.use('/api', rutaNoEncontrada);
app.use(manejarErrores);

module.exports = app;
