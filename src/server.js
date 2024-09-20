const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const usuarioRoutes = require('./routes/usuarioRoutes');
const localArmazenamentoRoutes = require('./routes/localArmazenamentoRoutes');
const itemRoutes = require('./routes/itemRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const compraRoutes = require('./routes/compraRoutes');
const compradorRoutes = require('./routes/compradorRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/locais-armazenamento', localArmazenamentoRoutes);
app.use('/api/itens', itemRoutes);
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/compradores', compradorRoutes);

app.get('/', (req, res) => {
  res.send('Sistema de Gerenciamento de Estoque e Controle de Compras');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
