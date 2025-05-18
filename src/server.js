const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/ControllersRoutes");
// Backend (Node.js/Express)
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3002 }); // Use outra porta

wss.on("connection", (ws) => {
  console.log("Cliente conectado");
  ws.send("Conexão estabelecida!");
});

// Frontend
const socket = new WebSocket("ws://localhost:3002"); // Ajuste a URL

dotenv.config();

const app = express();
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000", // Seu frontend
    credentials: true,
  })
);
app.use(bodyParser.json());

// Rotas da API
app.use("/api", routes);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
