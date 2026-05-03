const path = require('path');

function requireDependency(name) {
  try {
    return require(name);
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      throw error;
    }

    return require(path.join(__dirname, 'backend', 'node_modules', name));
  }
}

const express = requireDependency('express');
const cors = requireDependency('cors');
const { initializeDatabase } = require('./backend/db/connection');

const farmaciaRoutes = require('./backend/routes/farmacias');
const produtoRoutes = require('./backend/routes/produtos');
const cadastroRoutes = require('./backend/routes/cadastro');
const loginRoutes = require('./backend/routes/login');
const clienteRoutes = require('./backend/routes/clientes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/media', express.static(path.join(__dirname, 'backend', 'media')));

app.use('/farmacias', farmaciaRoutes);
app.use('/produtos', produtoRoutes);
app.use('/cadastro', cadastroRoutes);
app.use('/login', loginRoutes);
app.use('/clientes', clienteRoutes);

const PORT = 3000;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('Erro ao inicializar banco SQLite:', error);
    process.exit(1);
  });
