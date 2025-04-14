import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import CadastroCompra from "../components/CadastroCompra/CadastroCompra";
import Estoque from "../components/Estoque/Estoque";
import HistoricoCompras from "../components/HistoricoCompras/HistoricoCompras";
import Cadastro from "../components/Cadastro/Cadastro";
import ConfiguracoesUsuario from "../components/Configuracoes/Configuracoes";
import NotFound from "../components/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro-compra" element={<CadastroCompra />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/historico-compras" element={<HistoricoCompras />} />
        <Route path="/usuarios" element={<ConfiguracoesUsuario />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
