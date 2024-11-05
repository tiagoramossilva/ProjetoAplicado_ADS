const express = require('express');
const dotenv = require('dotenv');

const bodyParser = require('body-parser');
const cors = require('cors'); 
const routes = require('./routes/ControllersRoutes'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json()); 

app.use('/api', routes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});