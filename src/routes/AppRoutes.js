import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Login/Login';

const AppRoutes = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;