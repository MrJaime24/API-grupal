const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// ======== Middleware de logging ========
app.use((req, res, next) => {
  const log = { method: req.method, url: req.url, date: new Date().toISOString() };
  console.log(log);

  const logPath = path.join(__dirname, 'data', 'logs.json');

  // Crear la carpeta si no existe
  if (!fs.existsSync(path.dirname(logPath))) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
  }

  // Agregar el log al archivo
  fs.appendFileSync(logPath, JSON.stringify(log) + '\n');
  next();
});

// ======== Servir archivos estáticos ========
app.use('/data', express.static(path.join(__dirname, 'data')));

// ======== Importar Controladores ========
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

app.use('/api/services/carritos', require('./services/carritosService.js'));
app.use('/api/services/categorias', require('./services/categoriasService.js'));
app.use('/api/services/clientes', require('./services/clientesService.js'));
app.use('/api/services/pedidos', require('./services/pedidosService.js'));
app.use('/api/services/productos', require('./services/productosService.js'));
app.use('/api/services/proveedores', require('./services/proveedoresService.js'));

// ======== Iniciar Servidor ========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
