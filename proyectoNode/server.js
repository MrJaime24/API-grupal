const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  const log = { method: req.method, url: req.url, date: new Date() };
  console.log(log);
  fs.appendFileSync('./data/logs.json', JSON.stringify(log) + '\n');
  next();
});

// ======== Importar Controllers ========
const productosController = require('./controllers/productosController');
const categoriasController = require('./controllers/categoriasController');
const clientesController = require('./controllers/clientesController');
const pedidosController = require('./controllers/pedidosController');
const carritosController = require('./controllers/carritosController');
const proveedoresController = require('./controllers/proveedoresController');

// ======== Importar Rutas ========
app.use('/api/productos', require('./routes/productosRoutes'));
app.use('/api/categorias', require('./routes/categoriasRoutes'));
app.use('/api/clientes', require('./routes/clientesRoutes'));
app.use('/api/pedidos', require('./routes/pedidosRoutes'));
app.use('/api/carritos', require('./routes/carritosRoutes'));
app.use('/api/proveedores', require('./routes/proveedoresRoutes'));
app.use('/data', express.static(path.join(__dirname, 'data')));

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
