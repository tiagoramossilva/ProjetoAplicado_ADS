const express = require('express');
const dotenv = require('dotenv');

const usuarioRoutes = require('./routes/usuarioRoutes');
const razaoSocialRoutes = require('./routes/razaoSocialRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const projetoRoutes = require('./routes/projetoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const localArmazenamentoRoutes = require('./routes/localArmazenamentoRoutes'); 
const compraRoutes = require('./routes/compraRoutes'); 
const authRoutes = require('./routes/authRoutes')


const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/razoes-sociais', razaoSocialRoutes);
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/projetos', projetoRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/estoques', estoqueRoutes);
app.use('/api/locais-armazenamento', localArmazenamentoRoutes); 
app.use('/api/compras', compraRoutes); 
app.use('/api/login', authRoutes)


app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Sistema de Gerenciamento de Estoque e Controle de Compras');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
