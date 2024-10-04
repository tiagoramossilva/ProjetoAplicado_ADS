import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import CadastroCompra from '../pages/CadastroCompra/CadastroCompra';

const AppRoutes = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro-compra" element={<CadastroCompra />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;