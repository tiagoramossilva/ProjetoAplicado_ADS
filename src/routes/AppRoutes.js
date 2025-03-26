import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import CadastroCompra from '../pages/CadastroCompra/CadastroCompra';
import Estoque from '../pages/Estoque/Estoque';
import HistoricoCompras from '../pages/HistoricoCompras/HistoricoCompras';
import Cadastro from '../pages/Cadastro/Cadastro';
import ConfiguracoesUsuario from '../pages/Configuracoes/Configuracoes';

const AppRoutes = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro-compra" element={<CadastroCompra />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/historico-compras" element={<HistoricoCompras />} />
          <Route path="/configuracoes" element={<ConfiguracoesUsuario />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;