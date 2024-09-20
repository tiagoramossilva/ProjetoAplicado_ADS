// index.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Importar rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const razaoSocialRoutes = require('./routes/razaoSocialRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const compradorRoutes = require('./routes/compradorRoutes');
const projetoRoutes = require('./routes/projetoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');

const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/razoes-sociais', razaoSocialRoutes);
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/compradores', compradorRoutes);
app.use('/api/projetos', projetoRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/estoques', estoqueRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Sistema de Gerenciamento de Estoque e Controle de Compras');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
